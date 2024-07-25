import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
// import { root } from "../utils/root";

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkDeployStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambda = new cdk.aws_lambda.Function(this, "remix-lambda", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_20_X,
      handler: "lambda.handler",
      code: cdk.aws_lambda.Code.fromAsset(
        `${__dirname}/../web/remix-lambda/deploy.zip`
      ),
    });

    // Create a Function URL for the Lambda
    const functionUrl = lambda.addFunctionUrl({
      authType: cdk.aws_lambda.FunctionUrlAuthType.NONE,
      cors: {
        allowedOrigins: ["*"],
        allowedMethods: [cdk.aws_lambda.HttpMethod.ALL],
        allowedHeaders: ["*"],
      },
    });

    // Export the Function URL as a stack output
    new cdk.CfnOutput(this, "LambdaFunctionUrl", {
      value: functionUrl.url,
      description: "URL of the Lambda function",
      exportName: "RemixLambdaFunctionUrl",
    });
  }
}
