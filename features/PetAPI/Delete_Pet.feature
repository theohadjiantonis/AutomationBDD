Feature: Find Pet by ID Scenarios
  In order to achieve my goals
  As a username
  I want to be able to make a withdraw

Scenario: Delete pet that exists
    #Generates Json object
	Given I have a pet for sale
    #Sends request
	When I send the pet request
	And I Delete the pet
	And I look for the pet
    #Delete response assertions
	Then The Delete response was successful
	#Get Response assertions
	And The Get Pet Response has error code 1 with message 'Pet not found', type "error" and status 404

Scenario: Delete pet that doesn't exists
    #Generates Json object
	Given I have a pet for sale
    #Sends request
	When I send the pet request
	And I Delete the pet
	#Might not look pretty having the same step twice but it the best way to ensure that we always delete a pet that doesn't exist. If I was testing this manually that's how I would do it
	And I Delete the pet
    #Delete response assertions
	Then The Delete response was not successful

Scenario: Delete pet with invalid pet id
    #Generates Json object
	Given I have a pet for sale
	When I Delete a pet with id "invalid"
    #Delete response assertions
	Then The Delete Pet Response has error code 404 with message 'java.lang.NumberFormatException: For input string: \"invalid\"', type "unknown" and status 404