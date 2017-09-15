const AWS = require('aws-sdk');
var codepipeline = new AWS.CodePipeline();

codepipeline.listPipelines({}, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else {        // successful response
    // console.log(pipelines)
    data.pipelines.forEach(function (pipeline){
        var params = {
            name: pipeline.name /* required */
        };
        codepipeline.getPipelineState(params, function(err, pipelineListData) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            //  console.log(pipelineListData);           // successful response
            pipelineListData.stageStates.forEach(function (stage){
                if (stage.latestExecution.status == 'Failed'){
                    console.log(pipelineListData.pipelineName +" "+ stage.stageName + ' ' + stage.latestExecution.status);
                }
            })
        }   
        });
    })
  }   
});
