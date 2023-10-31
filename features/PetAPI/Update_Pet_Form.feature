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
	And Its' "name" is "Lassie"
	And Its' "status" is "pending"
	#Update the pet
	And I update the pet using a form	
	#Get the updated informoation for the pet
	And I look for the pet
    #Verify update pet response
	Then The update pet with form request is successful
	#Verify changes actually happened
	And The Get pet request is successful with pet status "pending"

Scenario: Invalid Id scenario
    #Generates Json object
	When I update the pet with id "hello", using a form
    #Verifies response was correct
	Then The update pet with form response has error code 404 with message 'java.lang.NumberFormatException: For input string: \"hello\"', type "unknown" and status 404