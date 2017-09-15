'use strict';
const AWS = require('aws-sdk');
const flaggedStatesString = process.env['FLAGGED_STATES'];
const slackWebhookUri = process.env['SLACK_URI'];

console.log('Loading function');
exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    var codepipeline = new AWS.CodePipeline();
    var Slack = require('slack-node');
    var slack = new Slack();
    slack.setWebhook(slackWebhookUri);
    console.log(slackWebhookUri)
    var flaggedStates = flaggedStatesString ? flaggedStatesString.split(','): ['Failed'];
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
                pipelineListData.stageStates.forEach(function (stage){
                    if (flaggedStates.indexOf(stage.latestExecution.status)>-1){console.log();
                        slack.webhook({
                            attachments:[
                                {
                                title: "Failed Pipeline Executions",
                                color: "#9C1A22",
                                text: "The Stage: " + stage.stageName + " in Pipeline: " +pipelineListData.pipelineName +" failed.",
                                }
                            ]
                        },function(err, response){
                            console.log(err)
                            console.log(response);
                        });
                    }
                })
            }   
            });
        })
    }   
    });
    callback(null, `Successfully processed records.`);
};
