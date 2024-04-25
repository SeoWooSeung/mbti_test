import { useState } from 'react';
import { options, questionsMBTI } from './question';
import './App.css';

function Question({ question, options, onAnswer }) {
    //답, 선택지 상태변수 관리
    const [selectedOption, setselectedOption] = useState('');

    // 다음문제로 넘어가기 함수
    const handleNextQuestion = () => {
        if (selectedOption === '그렇다.') {
            onAnswer(question.YES);
        } else {
            onAnswer(question.No);
        }

        console.log(selectedOption === '그렇다.');
        console.log(options);
        console.log(question.question);
        console.log(question.YES);
        console.log(question.No);
    };

    const handleOptionChange = (e) => {
        setselectedOption(e.target.value);
        console.log(selectedOption);
    };

    return (
        <>
            <div>
                <h2>{question.question}</h2>
                <form>
                    {options.map((option) => (
                        <div key={option}>
                            <label>
                                <input
                                    type="radio"
                                    name="option"
                                    value={option}
                                    checked={selectedOption === option}
                                    onChange={handleOptionChange}
                                />
                                {option}
                            </label>
                        </div>
                    ))}
                </form>{' '}
                <br /> <br />
                <button onClick={handleNextQuestion}>다음</button>
            </div>
        </>
    );
}

function App() {
    const [answers, setanswers] = useState([]);
    const [index, setIndex] = useState(0);

    //답변을 받아서 저장하는 함수
    const handleAnswer = (answer) => {
        setanswers([...answers, answer]);
        console.log('answers', answers);

        if (index < questionsMBTI.length) {
            setIndex(index + 1);
        } else {
            const mbtiType = calculateMBTIType(answers);
            alert(`당싱의 MBTI 결과는 ${mbtiType}`);
            window.location.reload();
        }
    };
    //mbti 결과 해석해주는 함수
    const calculateMBTIType = (answers) => {
        const dimensionCounts = {
            E: 0,
            I: 0,
            S: 0,
            N: 0,
            T: 0,
            F: 0,
            J: 0,
            P: 0,
        };

        answers.forEach((char) => {
            dimensionCounts[char]++;
        });

        // Determine the MBTI type
        const mbtiType = [
            dimensionCounts['E'] > dimensionCounts['I'] ? 'E' : 'I',
            dimensionCounts['S'] > dimensionCounts['N'] ? 'S' : 'N',
            dimensionCounts['T'] > dimensionCounts['F'] ? 'T' : 'F',
            dimensionCounts['J'] > dimensionCounts['P'] ? 'J' : 'P',
        ].join('');

        console.log('answer', answers);
        console.log('Your MBTI Type:', mbtiType);
        return mbtiType;
    };

    return (
        <>
            <div>
                {index < questionsMBTI.length ? (
                    <Question question={questionsMBTI[index]} options={options[0].options} onAnswer={handleAnswer} />
                ) : (
                    <button onClick={handleAnswer}>수고하셨습니다. 결과보기.</button>
                )}
            </div>
        </>
    );
}

export default App;
