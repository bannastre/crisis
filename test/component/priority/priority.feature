Feature: Priority

  Scenario Outline: I can get a priority status
    Given I have a known "mobileNumber" query parameter
    And I have a known "priorityGrant" query parameter
    And I have a "ocp-apim-subscription-key" header
    When I call "GET" "/crisis/priority"
    And I should get the expected status code <status>
    And I should get a response containing the attribute <attr1> with value <value1>
    And I should get a response containing the attribute <attr2> with value <value2>


    Examples:
      | status | attr1      | attr2   | value1       | value2 |
      | 200    | "priority" | "valid" | "key worker" | "true" |

  Scenario Outline: I can get a priority status without a priorityGrant identifier
    Given I have a known "mobileNumber" query parameter
    And I have a "ocp-apim-subscription-key" header
    When I call "GET" "/crisis/priority"
    And I should get the expected status code <status>
    And I should get a response containing the attribute <attr1> with value <value1>
    And I should get a response containing the attribute <attr2> with value <value2>


    Examples:
      | status | attr1      | attr2   | value1       | value2 |
      | 200    | "priority" | "valid" | "key worker" | "true" |


  Scenario Outline: I can get a standard status returned with an unrecognised mobileNumber
    Given I have an unknown "mobileNumber" query parameter
    And I have a known "priorityGrant" query parameter
    And I have a "ocp-apim-subscription-key" header
    When I call "GET" "/crisis/priority"
    And I should get the expected status code <status>
    And I should get a response containing the attribute <attr1> with value <value1>
    And I should get a response containing the attribute <attr2> with value <value2>


    Examples:
      | status | attr1      | attr2   | value1     | value2  |
      | 200    | "priority" | "valid" | "standard" | "false" |


  Scenario Outline: I can get a standard status returned with an unknown grant
    Given I have a known "mobileNumber" query parameter
    And I have an unknown "priorityGrant" query parameter
    And I have a "ocp-apim-subscription-key" header
    When I call "GET" "/crisis/priority"
    And I should get the expected status code <status>
    And I should get a response containing the attribute <attr1> with value <value1>
    And I should get a response containing the attribute <attr2> with value <value2>


    Examples:
      | status | attr1      | attr2   | value1     | value2  |
      | 200    | "priority" | "valid" | "standard" | "false" |