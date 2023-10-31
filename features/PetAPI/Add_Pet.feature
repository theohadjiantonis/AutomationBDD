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

Scenario: Invalid name scenario
    #Generates Json object
	Given I have a pet for sale
	#Can change specific parameter by providing the path to the property
	And Its' "name" is "100"
    #Sends request
	When I send the pet request
    #Verifies response was correct
	Then The response has error code 500 with message "something bad happened", type "unknown" and status 405

Scenario: Empty name scenario
    #Generates Json object
	Given I have a pet for sale
	#Can change specific parameter by providing the path to the property
	And Its' "name" is ""
    #Sends request
	When I send the pet request
    #Verifies response was correct
	Then The response has error code 500 with message "something bad happened", type "unknown" and status 405

Scenario: Invalid category name scenario
    #Generates Json object
	Given I have a pet for sale
	#Can change specific parameter by providing the path to the property
	And Its' "category.name" is "100"
    #Sends request
	When I send the pet request
    #Verifies response was correct
	Then The response has error code 500 with message "something bad happened", type "unknown" and status 405

Scenario: Empty category name scenario
    #Generates Json object
	Given I have a pet for sale
	#Can change specific parameter by providing the path to the property
	And Its' "category.name" is ""
    #Sends request
	When I send the pet request
    #Verifies response was correct
	Then The response has error code 500 with message "something bad happened", type "unknown" and status 405

Scenario: Invalid category Id scenario
    #Generates Json object
	Given I have a pet for sale
	#Can change specific parameter by providing the path to the property
	And Its' "category.id" is "Rex"
    #Sends request
	When I send the pet request
    #Verifies response was correct
	Then The response has error code 500 with message "something bad happened", type "unknown" and status 405

Scenario: Negative category number for Id scenario
    #Generates Json object
	Given I have a pet for sale
	#Can change specific parameter by providing the path to the property
	And Its' "category.id" is "-100"
    #Sends request
	When I send the pet request
    #Verifies response was correct
	Then The response has error code 500 with message "something bad happened", type "unknown" and status 405

Scenario: Empty category Id scenario
    #Generates Json object
	Given I have a pet for sale
	#Can change specific parameter by providing the path to the property
	And Its' "category.id" is ""
    #Sends request
	When I send the pet request
    #Verifies response was correct
	Then The response has error code 500 with message "something bad happened", type "unknown" and status 405

Scenario: Invalid tag name scenario
    #Generates Json object
	Given I have a pet for sale
	#Can change specific parameter by providing the path to the property
	And Its' "tag[0].name" is "100"
    #Sends request
	When I send the pet request
    #Verifies response was correct
	Then The response has error code 500 with message "something bad happened", type "unknown" and status 405

Scenario: Empty tag name scenario
    #Generates Json object
	Given I have a pet for sale
	#Can change specific parameter by providing the path to the property
	And Its' "tag[0].name" is ""
    #Sends request
	When I send the pet request
    #Verifies response was correct
	Then The response has error code 500 with message "something bad happened", type "unknown" and status 405

Scenario: Invalid tag Id scenario
    #Generates Json object
	Given I have a pet for sale
	#Can change specific parameter by providing the path to the property
	And Its' "tag[0].id" is "Rex"
    #Sends request
	When I send the pet request
    #Verifies response was correct
	Then The response has error code 500 with message "something bad happened", type "unknown" and status 405

Scenario: Negative tag number for Id scenario
    #Generates Json object
	Given I have a pet for sale
	#Can change specific parameter by providing the path to the property
	And Its' "tag[0].id" is "-100"
    #Sends request
	When I send the pet request
    #Verifies response was correct
	Then The response has error code 500 with message "something bad happened", type "unknown" and status 405

Scenario: Empty tag Id scenario
    #Generates Json object
	Given I have a pet for sale
	#Can change specific parameter by providing the path to the property
	And Its' "tag[0].id" is ""
    #Sends request
	When I send the pet request
    #Verifies response was correct
	Then The response has error code 500 with message "something bad happened", type "unknown" and status 405

Scenario: Invalid status scenario
    #Generates Json object
	Given I have a pet for sale
	#Can change specific parameter by providing the path to the property
	And Its' "staus" is "asdfasfdasfd"
    #Sends request
	When I send the pet request
    #Verifies response was correct
	Then The response has error code 500 with message "something bad happened", type "unknown" and status 405

Scenario: Empty status scenario
    #Generates Json object
	Given I have a pet for sale
	#Can change specific parameter by providing the path to the property
	And Its' "status" is ""
    #Sends request
	When I send the pet request
    #Verifies response was correct
	Then The response has error code 500 with message "something bad happened", type "unknown" and status 405