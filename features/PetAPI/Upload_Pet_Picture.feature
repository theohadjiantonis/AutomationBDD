Feature: Add Pet Scenarios
  In order to achieve my goals
  As a username
  I want to be able to make a withdraw

Scenario: Update a pet using a form
    #Generates Json object
	Given I have a pet for sale
    #Send add pet request
	When I send the pet request
	#Change the information of the pet in the payload
	#Update the pet
	And I upload a picture for the pet with additional metadata: "somethingorRather"
	#Get the updated informoation for the pet
	And I look for the pet
    #Verify update pet response
	Then The upload picture request is successful
	#Verify changes actually happened
	And The Get pet request is successful and the photoUrl Array has one entry

Scenario: Invalid Id scenario
    #Generates Json object
	When I upload a picture for the pet with id "hello"
    #Verifies response was correct
	Then The upload picture for the pet response has error code 404 with message 'java.lang.NumberFormatException: For input string: \"hello\"', type "unknown" and status 404