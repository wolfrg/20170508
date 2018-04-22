log_dir=`pwd`/log
log_path=$log_dir/ops.log
echo "Stop ops process ......."
ps aux | grep gunico| grep ops| awk '{print $2}' | xargs kill -HUP
mkdir -p $log_dir
echo "Start ops process ......"
gunicorn -c gunicorn.conf app:app -D -t 6000 --error-logfile $log_path --log-level info

echo "---------ops gunicorn process------"
sleep 2;
ps aux | grep gunicor
