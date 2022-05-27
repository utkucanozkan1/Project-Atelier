/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-else-return */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import QuestionList from './QuestionList.jsx';
import { ProductIdContext } from '../index.jsx';
import QuestionModal from './QuestionModal.jsx';
import NewQuestion from './NewQuestion.jsx';
import { FormStyle } from './q&a-styled-components/q&aSectionContainerStyle';

let questionsArray;
let searchingArray;
function QuestionsAndAnswers() {
  // need live data
  const { itemId } = useContext(ProductIdContext);
  const [searchQuestions, setSearchQuestions] = useState(false);
  const [searchArray, setSearchArray] = useState([]);
  const [questionArray, setQuestionArray] = useState([]);
  const [loading, toogleLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState({ search: '' });
  const [showModalForm, setShowModalForm] = useState('false');
  const [noQuestions, setNoQuestions] = useState(false);

  useEffect(() => {
    // let's just use 37311 for now
    axios.get(`/questions/${itemId}`).then((questions) => {
      questionsArray = [];
      questions.data.results.forEach((question) => {
        if (Object.keys(question.answers).length) {
          // check here for seller answer and put it in front of the list
          questionsArray.push(question);
        }
      });
      setQuestionArray([...questionsArray]);
      // console.log(questionsArray);
      toogleLoading(false);
      !questionsArray.length ? setNoQuestions(true) : setNoQuestions(false)
    })
      .then()
      .catch((err) => console.log(err));
  }, [itemId]);

  useEffect(() => {
    // searchingArray = [];
    if (searchTerm.search.length > 3) {
      console.log(searchArray);
      console.log(searchTerm);
      console.log(searchingArray);
      // console.log(questionsArray);
      // searchingArray = [];
      searchingArray = questionArray.filter((el, i) => el.question_body.toLowerCase().includes(searchTerm.search));
      setSearchArray([...searchingArray]);
      setSearchQuestions(true);
    } else {
      setSearchArray([]);
      setSearchQuestions(false);
    }
  }, [searchTerm.search]);

  const handleChange = function (e) {
    setSearchTerm({ ...searchTerm, search: e.target.value });
  };
  const showModal = () => {
    setShowModalForm('true');
  };

  const hideModal = () => {
    setShowModalForm('false');
  };

  if (!loading) {
    return (
      <section className="question-section">
        <div>Questions & Answers</div>
        <div>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              id="header-search"
              placeholder="Have a question? Search for answers..."
              name="search"
              value={searchTerm.search}
              onChange={(e) => handleChange(e)}
            />
          </form>
        </div>
        <div>
          {noQuestions ? <h2>Looks like no answered questions are available for this product, please add a new question</h2> : null}
        </div>
        {searchQuestions ? (
          <div className="main-div">
            {searchArray.slice(0, 2).map((question, i) => (
              <QuestionList question={question} key={i} />
            ))}
          </div>
        ) : (
          <div className="main-div">
            {questionArray.slice(0, 2).map((question, i) => (
              <QuestionList question={question} key={i} />
            ))}
          </div>
        )}
        <div className="bottom-buttons-div">
        <div>
          <button>MORE ANSWERED QUESTIONS</button>
        </div>
        <div>
          <button type="button" onClick={showModal}>
            ADD A QUESTION +
            {' '}
          </button>
          <div className="modal-popup">
            <QuestionModal
              show={showModalForm}
              handleExit={hideModal}
              itemId={itemId}
            >
              <FormStyle>
                <NewQuestion itemId={itemId}> </NewQuestion>
              </FormStyle>
            </QuestionModal>
          </div>
        </div>
        </div>
      </section>
    );
  } else {
    return (
      <section>
        <div> Questions Loading...</div>
      </section>
    );
  }
}
export default QuestionsAndAnswers;
