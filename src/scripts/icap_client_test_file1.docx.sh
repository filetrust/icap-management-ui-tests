#!/bin/bash
echo "Testing UI"

icap_host="icap-client-main.northeurope.cloudapp.azure.com"
icap_client="/usr/local/c-icap/bin/c-icap-client"
icap_port="1344"
input_folder="/src/data/input"
output_folder="/output/files"
service_name=gw_rebuild
resp_url=""
test_file="file1.docx"
run_id=$test_file
output_folder=$output_folder/$run_id
timings_log=$output_folder/timings.log
echo Timing log location = $timings_log
mkdir $output_folder

test_start=$(date +%s%N)
for fin in $test_files
do
    
    output_path=$output_folder/$fin
	file_size=$(stat --format=%s $input_folder/$fin)
    
	start_time=$(date +%s%N)
    $icap_client -i $icap_host -p $icap_port -f $input_folder/$fin  -o $output_path -s $service_name -resp $resp_url
	end_time=$(date +%s%N)
	echo $fin, $file_size bytes : $((($end_time - $start_time)/1000000)) ms >> $timings_log
done
test_end=$(date +%s%N)
echo Test Duration : $((($test_end - $test_start)/1000000000)) s >> $timings_log