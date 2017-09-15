# codepipeline-crawl
Crawl through AWS Codepipeline to notify the stages.


### How to install 
1. Clone the repository.
2. Run `cd codepipeline-crawl` and export the AWS Credentials.
    ``` export AWS_DEFAULT_REGION="*****"
        export AWS_ACCESS_KEY_ID=*****
        export AWS_SECRET_ACCESS_KEY=***** ```
3. Run `aws cloudformation package --template cloudformation.yaml --s3-bucket test-trail-kamol --output-template-file output-template.yaml`.
4. Create cloudformation stack with `output-template.yaml`.
