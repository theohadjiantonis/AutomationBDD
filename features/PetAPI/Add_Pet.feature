Feature: Add Pet Scenarios

Scenario: Add a pet
    #Generates Json object
	Given I have a pet for sale
    #Sends request
    #Sends request
	When I send the pet request
    #Verifies response was correct
	Then The pet request is successful with status 200

Scenario: Add a pet with specific pet name and category name
    #Generates Json object
	Given I have a pet for sale
	#Can change specific parameter by providing the path to the property
	And Its' "name" is "Rex"
	And Its' "category.name" is "Inspector"
    #Sends request
	When I send the pet request
    #Verifies response was correct
	Then The pet request is successful with status 200

Scenario: Invalid Id scenario
    #Generates Json object
	Given I have a pet for sale
	#Can change specific parameter by providing the path to the property
	And Its' "id" is "Rex"
    #Sends request
	When I send the pet request
    #Verifies response was correct
	Then The response has error code 500 with message "something bad happened", type "unknown" and status 405

Scenario: Negative number for Id scenario
    #Generates Json object
	Given I have a pet for sale
	#Can change specific parameter by providing the path to the property
	And Its' "id" is "-100"
    #Sends request
	When I send the pet request
    #Verifies response was correct
	Then The response has error code 500 with message "something bad happened", type "unknown" and status 405

Scenario: Empty Id scenario
    #Generates Json object
	Given I have a pet for sale
	#Can change specific parameter by providing the path to the property
	And Its' "id" is ""
    #Sends request
	When I send the pet request
    #Verifies response was correct
	Then The response has error code 500 with message "something bad happened", type "unknown" and status 405

#The steps are written vaguely on purpose and without strong language which allows for the users to write high level, logically worded scenarios with very little coding effort.
#With these 5 steps that I've written, we can cover all the scenarios that are related to this API with custom error messages, different statuses and error code responses. 

#The 5 steps:
	#Given I have a pet for sale
	#Given Its' {property that we want to modify} is {value of property}
	#When I send the pet request
	#Then The pet request request is successful with status 200	
	#Then The pet request returns error code {error code in the response body} with message {message in the response body} , type {type in the response body} and status {request status}