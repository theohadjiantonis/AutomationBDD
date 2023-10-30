Feature: Find Pet by ID Scenarios
  In order to achieve my goals
  As a username
  I want to be able to make a withdraw
Scenario: Find pets with status available
    #Generates Json object
	Given I have a pet for sale
	When I look for the pet with "status" "available"
	Then The Get Pet Response only has pets that are "available"

Scenario: Find pets with status pending
    #Generates Json object
	Given I have a pet for sale
	When I look for the pet with "status" "pending"
	Then The Get Pet Response only has pets that are "pending"

Scenario: Find pets with status sold
    #Generates Json object
	Given I have a pet for sale
	When I look for the pet with "status" "sold"
	Then The Get Pet Response only has pets that are "sold"

Scenario: Find pets with status asdlfknasdfl
    #Generates Json object
	Given I have a pet for sale
	When I look for the pet with "status" "asdlfknasdfl"
	Then The Get Pet Response has error code 404 with message 'some error message', type "unknown" and status 400