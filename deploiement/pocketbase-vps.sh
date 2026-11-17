#!/usr/bin/env bash
# Installe PocketBase sur le VPS Debian : service systemd + Apache en proxy HTTPS.
# À lancer UNE fois sur le VPS :  bash pocketbase-vps.sh
# Prérequis : l'enregistrement DNS A  api.bailly-laura.fr → 185.157.244.202 existe déjà.
set -euo pipefail
DOMAINE="api.bailly-laura.fr"
DOSSIER="/opt/pocketbase"

read -rp "E-mail du compte administrateur PocketBase : " PB_EMAIL
read -rsp "Mot de passe (12 caractères minimum, non affiché) : " PB_MDP; echo

sudo apt-get install -y unzip curl
JSON=$(curl -fsSL https://api.github.com/repos/pocketbase/pocketbase/releases/latest)
VERSION=$(printf '%s' "$JSON" | sed -n 's/.*"tag_name": *"v\([^"]*\)".*/\1/p' | head -n1)
[ -n "$VERSION" ] || { echo "Version de PocketBase introuvable"; exit 1; }
echo "PocketBase $VERSION"
sudo useradd --system --home "$DOSSIER" --shell /usr/sbin/nologin pocketbase 2>/dev/null || true
sudo mkdir -p "$DOSSIER"
curl -fsSL "https://github.com/pocketbase/pocketbase/releases/download/v${VERSION}/pocketbase_${VERSION}_linux_amd64.zip" -o /tmp/pb.zip
sudo unzip -oq /tmp/pb.zip pocketbase -d "$DOSSIER"
sudo chown -R pocketbase:pocketbase "$DOSSIER"
sudo -u pocketbase "$DOSSIER/pocketbase" superuser upsert "$PB_EMAIL" "$PB_MDP" --dir "$DOSSIER/pb_data"

sudo tee /etc/systemd/system/pocketbase.service >/dev/null <<UNIT
[Unit]
Description=PocketBase (données du portfolio)
After=network.target

[Service]
User=pocketbase
WorkingDirectory=$DOSSIER
ExecStart=$DOSSIER/pocketbase serve --http=127.0.0.1:8090
Restart=on-failure

[Install]
WantedBy=multi-user.target
UNIT
sudo systemctl daemon-reload
sudo systemctl enable --now pocketbase

sudo a2enmod proxy proxy_http headers >/dev/null
sudo tee /etc/apache2/sites-available/pocketbase.conf >/dev/null <<VHOST
<VirtualHost *:80>
    ServerName $DOMAINE
    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:8090/
    ProxyPassReverse / http://127.0.0.1:8090/
</VirtualHost>
VHOST
sudo a2ensite pocketbase >/dev/null
sudo apache2ctl configtest
sudo systemctl reload apache2
sudo certbot --apache -d "$DOMAINE" --non-interactive --agree-tos --redirect -m "$PB_EMAIL"
echo; echo "OK → https://$DOMAINE/api/health   (admin : https://$DOMAINE/_/)"
