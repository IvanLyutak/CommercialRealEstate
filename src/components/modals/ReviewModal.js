import { Modal, Form, FloatingLabel } from 'react-bootstrap';

import "./ReviewModal.css"

function ReviewModal({show, onHide, sendReview}) {

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="reviewModal"
        >

        <Modal.Header closeButton>
            <h4 className="titleReviewModal">
                Написать отзыв
            </h4>
        </Modal.Header>
        <Modal.Body>
            <div className="descriptionUploadModule">
                <FloatingLabel controlId="inputTextReviewModal" label="Введите текст отзыва" className="input">
                    <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '100px' }}
                    />
                </FloatingLabel>
            </div>
            <button className="buttonReviewModal" onClick={() => sendReview(document.getElementById('inputTextReviewModal').value)}>Отправить</button>
        </Modal.Body>
        </Modal>
    );
}

export default ReviewModal