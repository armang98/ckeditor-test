export enum NodeType {
    /**
     * 	Represents an element.
     *  Children: Element, Text, Comment, ProcessingInstruction, CDATASection, EntityReference
     */
    Element = 1,

    /**
     * 	Represents an attribute	Text, EntityReference
     */
    Attr = 2,

    /**
     * 	Represents textual content in an element or attribute	None
     */
    Text = 3,

    /**
     * 	Represents a CDATA section in a document (text that will NOT be parsed by a parser)	None
     */
    CDATASection = 4,

    /**
     * 	Represents an entity reference	Element, ProcessingInstruction, Comment, Text, CDATASection, EntityReference
     */
    EntityReference = 5,

    /**
     * 	Represents an entity	Element, ProcessingInstruction, Comment, Text, CDATASection, EntityReference
     */
    Entity = 6,

    /**
     * 	Represents a processing instruction	None
     */
    ProcessingInstruction = 7,

    /**
     * 	Represents a comment	None
     */
    Comment = 8,

    /**
     * 	Represents the entire document (the root-node of the DOM tree)	Element, ProcessingInstruction, Comment, DocumentType
     */
    Document = 9,

    /**
     * 		Provides an interface to the entities defined for the document	None
     */
    DocumentType = 10,

    /**
     * 		Represents a "lightweight" Document object, which can hold a portion of a document	Element, ProcessingInstruction, Comment, Text, CDATASection, EntityReference
     */
    DocumentFragment = 11,

    /**
     * Represents a notation declared in the DTD
     */
    Notation = 12
}
