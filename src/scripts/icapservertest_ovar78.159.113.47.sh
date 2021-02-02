#!/bin/bash


icap_host="78.159.113.47"
icap_client="c-icap-client"
icap_port="1344"
input_folder="/mnt/c/icap/tests/input"
output_folder="/mnt/c/icap/tests/Output"
service_name=gw_rebuild


test_files="
issues.docx"


run_id=$RANDOM
output_folder=$output_folder/$run_id
timings_log=$output_folder/timings.log
echo Timing log location = $timings_log
mkdir $output_folder

test_start=$(date +%s%N)
for fin in $test_files
do
    echo '####################################################################################################################'
    echo  Sending file ... $fin via $icap_host on port $icap_port 
    output_path=$output_folder/$fin
	file_size=$(stat --format=%s $input_folder/$fin)
    
	start_time=$(date +%s%N)
    time $icap_client -i $icap_host -p $icap_port -f $input_folder/$fin  -o $output_path -s $service_name -v
	end_time=$(date +%s%N)
	echo $fin, $file_size bytes : $((($end_time - $start_time)/1000000)) ms >> $timings_log
done
test_end=$(date +%s%N)
echo Test Duration : $((($test_end - $test_start)/1000000000)) s >> $timings_log
sleep 3