interface FlowchartPromptParams {
  title: string;
  description: string;
  BRDS: string;
  PRDS: string;
}

export function flowchartPrompt({
  title,
  description,
  BRDS,
  PRDS
}: FlowchartPromptParams): string {
  return `You are a business analyst with expertise in Mermaid diagramming and charting tool tasked with creating a detailed breakdown of the business process flow for a given business process. 

Below is the business process for which the mermaid flowchart diagram code syntax has to be generated:

Business Process:
Title: ${title}
${description}

Business Requirements:
${BRDS}

Product Requirements:
${PRDS}

The mermaid diagram code syntax must be STRICTLY derived based on the provided business process description, business and product requirements, with no additional or irrelevant information included. 
Ensure that each step in the flowchart diagram code is clear, concise, and comprehensive.
Maintain the title for Mermaid as same as Business Process.

Output Structure should be a valid mermaid code syntax: Here is the sample Structure. Please follow this response format exactly. 

RESPONSE FORMAT EXAMPLES
Example 1:
Business Process: 
Title: Ticket Resolution Workflow
Ticket Resolution functionality.

Mermaid Flow Response:
---
title: Ticket Resolution Workflow
---
flowchart TD
    A["Ticket/Email Submitted by Customer"] --> B[Support Case is Created and Assigned];
    B --> C{"During STD Business Hours?"};
    C -- Yes --> D[Alerts are sent to the Support team to respond];
    C -- No --> E["Alerts are sent to the on-call Technician to respond"];
    D --> F{"Is ticket assigned?"};
    E --> F;
    F -- Yes --> G[Ticket is reviewed based on priority by Support team];
    F -- No --> H[Reminder is sent];
    H --> F;
    G --> I[Support team resolves Issues];
    I --> K{"Was issue resolved?"};
    K -- Yes --> J[Ticket is closed and system sends follow up Email];
    K -- No --> I;

Example 2:
Business Process:
Title: Order Fulfillment Workflow

Mermaid Flow Response:
---
title: Order Fulfillment Workflow
---
flowchart TD
    A["Start: Customer places order (online/phone)"] --> B[Order Processing System receives order];
    B --> C[Check Inventory];
    C -- In Stock --> D[Generate Invoice];
    C -- Out of Stock --> E["Notify Customer about backorder/alternatives"];
    E --> F{"Customer Accepts Alternative?"};
    F -- Yes --> G[Update Order with Alternative];
    G --> D;
    F -- No --> H["Cancel Order / Refund"];
    H --> I[Notify Customer of Cancellation];
    D --> J[Payment Processing];
    J -- Successful --> K["Fulfill Order (Warehouse)"];
    J -- Failed --> L[Notify Customer of Payment Issue];
    L --> M{"Customer Retry Payment?"};
    M -- Yes --> J;
    M -- No --> H;
    K --> N[Shipping];
    N --> O[Delivery];
    O --> P[Customer Receives Order];
    P --> Q["Customer Feedback/Support"];
    Q --> R["End: Order Complete"];
    K --> S[Update Inventory];
    S --> N;


Note:
1. The actual code syntax for a given business process may differ but the format should not be changed.
2. Use the right representation for each node. For instance:
    a. For nodes representing database use [()]
    b. For nodes representing entities like application, UI, Server etc, use [[]]
    c. For any decision-making scenario use {}
    d. Display the actions like Send login request, verify credentials as text on links. Do not add a separate node for those.
    e. Always have single start and end nodes.
3. Generate appropriate title for the flowchart only based on the business process information. Do not assume anything. Title should be crisp and catchy and should not exceed 3 words.
4. Do not generate more than 10 steps in the flow chart for better readability. Keep the diagram crisp and to the point.
5. Take time and think about the code and the diagram for accuracy and correctness before you write a single line of code.
6. The workflow process diagram should accurately represent the business process.
7. The workflow should not contain technical or implementation details.
8. The process should be designed to maintain a continuous and logical flow, avoiding any points where it can become stalled or blocked.

STRICT: 
(!) RESPONSE SHOULD STRICTLY FOLLOW SYNTAX OF MERMAID FLOWCHART DIAGRAMS and should be parsed without errors.
(!) DO NOT include INVALID notations/symbols like [(())], (([])) that throws SYNTAX ERROR in mermaid editor.
(!) DO NOT include double quotes(") inside text of a node. USE single quotes (') instead.
(!) WRAP the node text with double quotes (") if the node text contains special characters.
(!) Response should contain mermaid flowchart diagram code syntax of business process ONLY: no other additional text.
(!) Please ensure the RESPONSE containing mermaid flowchart diagram CODE is WITHOUT ANY SYNTAX ERROR and strictly based on the provided business process context and the diagram is clear, concise, and comprehensive with complete design. 
(!) Every step, decision, data element, and actor in the generated process flow must be directly derivable from the provided context.  If an element cannot be logically derived from the context, it should not be included.

The response should be a mermaid flowchart diagram code syntax by CLEARLY MARKING the RELATIONSHIPS between different ENTITIES, ADDING DECISION PATH with success and failure path wherever required and comply with PEP8 standards. 
The response diagram should be strictly based on provided business process description and should be comprehensive with complete design.

Output only valid mermaid diagram code syntax. Do not include \`\`\`mermaid\`\`\` on start and end of the response.`;
}
