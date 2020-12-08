/**
* Returns the name of the table in the database by a given form name.
*
* @method getDBTableName
* @param 		{String} formName name of the form
* @returns 	{String} 				 	name of the corresponding table in the database
* @author bivanov
*/
export function getDBTableName (formName) {
	let tableName = "";
	switch (formName) {
		case "BusinessDetails":
			tableName = "business_detail";
			break;
		case "BankDetails":
			tableName = "bank_detail";
			break;
		case "BusinessRepresentative":
			tableName = "representatives";
			break;
		case "ProcessingInformation":
			tableName = "processing_information";
			break;
		case "RiskManagement":
			tableName = "risk_management";
			break;
		case "SupportingDocuments":
			tableName = "documents";
			break;
	}
	return tableName;
};