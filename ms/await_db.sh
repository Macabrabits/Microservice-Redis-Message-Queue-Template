set -e
  
host="$1"
shift
cmd="$@"


  
until mysqladmin ping -h db -p root; do
  >&2 echo "DB is unavailable - sleeping"
  sleep 1
done
  
>&2 echo "DB is up - executing command"
exec $cmd