Feature: Find Pet by ID Scenarios
  In order to achieve my goals
  As a username
  I want to be able to make a withdraw

Scenario: Find a pet by ID
    #Generates Json object
	Given I have a pet for sale
    #Sends request
    #Sends request
	When I send the pet request
	And I look for the pet
    #Verifies response was correct
	Then The Get pet request is successful with pet status "available"

Scenario: Find a pet with string ID
    #Generates Json object
	Given I have a pet for sale
	#Then we look for the pet with id Rex
	When I look for the pet with "id" "Rex"
	Then The Get Pet Response has error code 404 with message 'java.lang.NumberFormatException: For input string: \"Rex\"', type "unknown" and status 404