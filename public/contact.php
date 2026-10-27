<?php
/**
 * Traitement du formulaire de contact.
 * Ce fichier est copié tel quel dans dist/ et exécuté par l'hébergement Infomaniak (PHP).
 * Il vérifie les champs puis m'envoie le message par e-mail. Rien n'est stocké.
 */

// ⚠️ Adresse qui reçoit les messages
$destinataire = 'laura.bailly08102006@gmail.com';
// ⚠️ Expéditeur technique : utilise une adresse de TON domaine (ex. contact@ton-domaine.fr)
//    sinon les e-mails risquent d'arriver dans les spams.
$expediteur = 'no-reply@bailly-laura.fr';

function retour(string $etat): void {
    header('Location: /contact/?envoi=' . $etat);
    exit;
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

$objet = '=?UTF-8?B?' . base64_encode('[Portfolio] ' . $sujet . ' — ' . $nom) . '?=';
$corps = "Nouveau message depuis le portfolio\n\n"
    . "Nom : $nom\nE-mail : $email\nSujet : $sujet\n\n"
    . "Message :\n$message\n";

$entetes = [
    'From' => $expediteur,
    'Reply-To' => $email,
    'Content-Type' => 'text/plain; charset=UTF-8',
    'X-Mailer' => 'PHP/' . phpversion(),
];

retour(mail($destinataire, $objet, $corps, $entetes) ? 'ok' : 'erreur');
