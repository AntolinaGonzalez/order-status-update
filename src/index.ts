import { SQSEvent, SQSRecord } from "aws-lambda";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { StatusChangeEvent } from "../dto/StatusChangeEvent";
import { v4 as uuidv4 } from "uuid";

const {
  // variables 
} = process.env;

const client = new DynamoDB({});
const ddbDocClient = DynamoDBDocumentClient.from(client);
const TableName = "order-status";

export const statusLambdaHandler = async (event: SQSEvent) => {
  try {
      const statusChangeEvent = event.Records.flatMap(
        (record: SQSRecord) => JSON.parse(record.body) as StatusChangeEvent
      )[0];
      console.info(statusChangeEvent);
      await ddbDocClient.send(
          new PutCommand({
            TableName,
            Item: {
              id: uuidv4(),
              order_id:statusChangeEvent.order_id,
              order_status: statusChangeEvent.status,
              description: statusChangeEvent.description
            }
          })
      );
  } catch (error: any) {
    console.error(error?.response?.data || error);
    if (error.name === 'ConditionalCheckFailedException') {
      return;
    }
    throw error;
  }
};
