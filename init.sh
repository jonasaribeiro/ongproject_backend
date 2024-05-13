while ! pg_isready -h db -p 5432 -U onguser; do
    echo "Aguardando o DB..."
    sleep 2
done

npx primsa migrate deploy

node start