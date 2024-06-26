import { QuestionData, QuestionDataSchema, StoreResponse } from "../utils/types"

export function isValideQuestion(question: QuestionData) {
	const questionParsed = QuestionDataSchema.safeParse(question)
	if (!questionParsed.success) {
		console.error(questionParsed.error)
	}
	return questionParsed.success
}

export function validateStoreResponseLength<DataType>(response: StoreResponse<DataType>, length: number) {
	if (response.success && response.data.length !== length) {
		response = {
			success: false,
			error: `StoreResponse length must be ${length} but ${response.data.length} found`,
		}
	}
	return response
}
