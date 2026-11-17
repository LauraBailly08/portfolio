<?php
/**
 * Traitement du formulaire de contact.
 * Envoi par SMTP authentifié. Les identifiants sont lus dans un fichier placé
 * HORS du dossier public (jamais dans le dépôt Git) : /var/www/portfolio-config/contact.php
 * Il vérifie les champs puis envoie le message par e-mail. Rien n'est stocké.
 */

const FICHIER_CONFIG = '/var/www/portfolio-config/contact.php';

function retour(string $etat): void {
    header('Location: /contact/?envoi=' . $etat);
    exit;
}

/** Lit une réponse SMTP complète (elle peut tenir sur plusieurs lignes). */
function smtp_lire($socket): string {
    $reponse = '';
    while (($ligne = fgets($socket, 515)) !== false) {
        $reponse .= $ligne;
        if (strlen($ligne) < 4 || $ligne[3] === ' ') {
            break;
        }
    }
    return $reponse;
}

function smtp_cmd($socket, string $commande, string $attendu): bool {
    fwrite($socket, $commande . "\r\n");
    return str_starts_with(smtp_lire($socket), $attendu);
}

function envoyer_smtp(array $c, string $objet, string $corps, string $replyTo): bool {
    $socket = @stream_socket_client('ssl://' . $c['host'] . ':' . $c['port'], $errno, $errstr, 10);
    if (!$socket) {
        return false;
    }
    stream_set_timeout($socket, 10);

    $corps = preg_replace('/^\./m', '..', str_replace("\n", "\r\n", str_replace("\r\n", "\n", $corps)));
    $entetes = implode("\r\n", [
        'Date: ' . date('r'),
        'From: Portfolio <' . $c['from'] . '>',
        'To: <' . $c['to'] . '>',
        'Reply-To: <' . $replyTo . '>',
        'Subject: ' . $objet,
        'Message-ID: <' . bin2hex(random_bytes(8)) . '@bailly-laura.fr>',
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
    ]);

    $ok = str_starts_with(smtp_lire($socket), '220')
        && smtp_cmd($socket, 'EHLO bailly-laura.fr', '250')
        && smtp_cmd($socket, 'AUTH LOGIN', '334')
        && smtp_cmd($socket, base64_encode($c['user']), '334')
        && smtp_cmd($socket, base64_encode($c['pass']), '235')
        && smtp_cmd($socket, 'MAIL FROM:<' . $c['from'] . '>', '250')
        && smtp_cmd($socket, 'RCPT TO:<' . $c['to'] . '>', '250')
        && smtp_cmd($socket, 'DATA', '354')
        && smtp_cmd($socket, $entetes . "\r\n\r\n" . $corps . "\r\n.", '250');

    fwrite($socket, "QUIT\r\n");
    fclose($socket);
    return $ok;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    retour('erreur');
}

// Piège à robots : un humain ne remplit jamais ce champ invisible
if (!empty($_POST['site'])) {
    retour('ok');
}

$nom = trim(strip_tags($_POST['nom'] ?? ''));
$email = trim($_POST['email'] ?? '');
$sujet = trim(strip_tags($_POST['sujet'] ?? 'Message'));
$message = trim(strip_tags($_POST['message'] ?? ''));

// Validation côté serveur (on ne fait jamais confiance au navigateur)
if ($nom === '' || mb_strlen($nom) > 100
    || !filter_var($email, FILTER_VALIDATE_EMAIL)
    || mb_strlen($message) < 10 || mb_strlen($message) > 3000) {
    retour('erreur');
}

// Empêche l'injection d'en-têtes e-mail
$nom = str_replace(["\r", "\n"], ' ', $nom);
$sujet = str_replace(["\r", "\n"], ' ', $sujet);

$config = is_file(FICHIER_CONFIG) ? (require FICHIER_CONFIG) : null;
if (!is_array($config)) {
    retour('erreur');
}

$objet = '=?UTF-8?B?' . base64_encode('[Portfolio] ' . $sujet . ' - ' . $nom) . '?=';
$corps = "Nouveau message depuis le portfolio\n\n"
    . "Nom : $nom\nE-mail : $email\nSujet : $sujet\n\n"
    . "Message :\n$message\n";

retour(envoyer_smtp($config, $objet, $corps, $email) ? 'ok' : 'erreur');