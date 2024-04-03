import { useState } from "react"
import { QuestionView } from "../../components/question/QuestionView"
import { Game } from "../../utils/types"
import { AnswerReview } from "../../components/question/AnswerReview"

type GameReviewProps = {
	game: Game
	sendReviews: (review: Record<string, Record<string, boolean>>) => void
}

export const GameReview = (props: GameReviewProps) => {
	const [reviews, setReviews] = useState({} as Record<string, Record<string, boolean>>)
	const [questionIndex, setQuestionIndex] = useState(0)
	const [usersIndex, setUsersIndex] = useState(0)
	const [isAnswerRight, setIsAnswerRight] = useState(false)

	const question = props.game.questions[questionIndex]
	const userIds = Object.keys(props.game.users)
	const user = props.game.users[userIds[usersIndex]]

	const goNext = () => {
		// Reinitialize answer review state
		setIsAnswerRight(false)

		// Review completed
		if (questionIndex === props.game.questions.length - 1 && usersIndex === userIds.length - 1) {
			props.sendReviews(reviews)
		}
		// Go to next question
		else if (usersIndex === userIds.length - 1) {
			setUsersIndex(0)
			setQuestionIndex(questionIndex + 1)
		}
		// Go to next user
		else {
			setUsersIndex(usersIndex + 1)
		}
	}

	const handleAnswerReviewChange = (isRight: boolean) => {
		setIsAnswerRight(isRight)

		// Initialize reviews for this question
		if (reviews[question.id] === undefined) {
			reviews[question.id] = {}
		}

		// Update reviews
		reviews[question.id][userIds[usersIndex]] = isRight
		setReviews(reviews)
	}

	return (
		<div className="flex flex-col space-y-4">
			<h2>Question Review</h2>
			<div className="felx flex-col space-y-4 pb-4">
				<QuestionView question={question} />
				<div className="divider"></div>
				<AnswerReview
					username={user.name}
					answer={user.answers[question.id]}
					isRight={isAnswerRight}
					onChange={handleAnswerReviewChange}
				/>
			</div>
			<button className="btn btn-neutral self-end rounded-full" onClick={goNext}>
				Suivant
			</button>
		</div>
	)
}
