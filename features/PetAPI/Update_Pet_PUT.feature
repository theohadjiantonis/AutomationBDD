Feature: Update Pet with PUT Scenarios

Scenario: Add a pet
    #Generates Json object
	Given I have a pet for sale
    #Sends request
	When I send the pet request	
	And Its' "name" is "Lassie"
	And Its' "category.name" is "Did you know most Lassies where male?"
	And I update the pet
    #Verifies response was correct
	Then The pet request is successful with status 200

Scenario: Invalid Id scenario
    #Generates Json object
	Given I have a pet for sale
	#Sends request
	When I send the pet request	
	And Its' "id" is "Lassie"
	And I update the pet
    #Verifies response was correct
	Then The response has error code 500 with message "something bad happened", type "unknown" and status 405