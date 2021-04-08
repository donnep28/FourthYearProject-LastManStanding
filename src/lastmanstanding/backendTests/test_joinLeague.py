import boto3
import pytest
from moto import mock_dynamodb2
from amplify.backend.function.joinLeague.src.index import updateLeaguePlayerDB, updatePlayerDB, updatedRemainingPlayers

@mock_dynamodb2
def test_addLeaguePlayerDB():
    # set up DB
    table_name = 'leaguePlayerDB-develop'
    dynamodb = boto3.resource('dynamodb', 'eu-west-1')
    
    # create DB
    dynamodb.create_table(
        TableName=table_name,
        KeySchema=[{'AttributeName': 'LeaguePlayerID', 'KeyType': 'HASH'}],
        AttributeDefinitions=[{'AttributeName': 'LeaguePlayerID','AttributeType': 'S'}],
        ProvisionedThroughput={'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
    )

    # Add item to mock table for test
    leaguePlayerTable = dynamodb.Table(table_name)

    leagueID = 'test'
    mock_input= {
      'sub': '123-1234',
      'username': 'tcal97',
      'firstName': 'Tom',
      'lastName': 'Callaghan' 
    }

    updateLeaguePlayerDB_func_response = updateLeaguePlayerDB(leaguePlayerTable, mock_input, leagueID)

    response = leaguePlayerTable.scan()

    assert updateLeaguePlayerDB_func_response == 'Successfully added to LeaguePlayerDB'
    assert response['Items'][0]['fullName'] == 'Tom Callaghan'

@mock_dynamodb2
def test_updatePlayerDB():
    # set up DB
    table_name = 'PlayerDB-develop'
    dynamodb = boto3.resource('dynamodb', 'eu-west-1')
    
    # create DB
    dynamodb.create_table(
        TableName=table_name,
        KeySchema=[{'AttributeName': 'Sub', 'KeyType': 'HASH'}],
        AttributeDefinitions=[{'AttributeName': 'Sub','AttributeType': 'S'}],
        ProvisionedThroughput={'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
    )

    # Add item to mock table for test
    PlayerTable = dynamodb.Table(table_name)

    PlayerTable.put_item(
			Item={
				'Sub': '123-1234',
        'leagueIDs': ['test1', 'test2']
			})

    mock_input= {
      'sub': '123-1234',
    }
    leagueIDs = ['test1', 'test2']

    updatePlayerDB_func_response = updatePlayerDB(PlayerTable, leagueIDs, mock_input, 'test3')

    response = PlayerTable.scan()

    assert updatePlayerDB_func_response == 'Successfully updated PlayerDB'
    assert response['Items'][0]['leagueIDs'] == ['test1', 'test2', 'test3']

@mock_dynamodb2
def test_updateRemainingPlayers():
    # set up DB
    table_name = 'LeaguesDB-develop'
    dynamodb = boto3.resource('dynamodb', 'eu-west-1')
    
    # create DB
    dynamodb.create_table(
        TableName=table_name,
        KeySchema=[{'AttributeName': 'LeagueID', 'KeyType': 'HASH'}],
        AttributeDefinitions=[{'AttributeName': 'LeagueID','AttributeType': 'S'}],
        ProvisionedThroughput={'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
    )

    # Add item to mock table for test
    LeagueTable = dynamodb.Table(table_name)

    LeagueTable.put_item(
			Item={
				'LeagueID': 'testing#123',
        'RemainingPlayers': '3'
			})

    leagueID = 'testing#123'

    updateRemainingPlayersDB_func_response = updatedRemainingPlayers(LeagueTable, leagueID)

    response = LeagueTable.scan()

    assert updateRemainingPlayersDB_func_response == 'Successfully updated remaining players'
    assert response['Items'][0]['RemainingPlayers'] == '4'
