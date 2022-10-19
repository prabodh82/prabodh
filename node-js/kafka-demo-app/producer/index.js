console.log("producer");
import Kafka from "node-rdkafka";

const stream = Kafka.createWriteStream(
  {
    "metadata.broker.list": "localhost:9092",
  },
  {},
  { topic: "test" }
);


function queueMessage() {
    const sucess = stream.write(Buffer.from("Hey my name is prabodh"));
    if(sucess){
      console.log("message published successfully to stream");
    }else{
      console.log("something went wrong");
    }
}
setInterval(()=>{
    queueMessage();
}, 3000)