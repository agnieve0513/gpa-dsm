import React from 'react'
import { Modal, Button } from 'react-bootstrap'

function ModalComp(props) {
    const {title, content} = this.props;

    return (
        <div>
            <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {content}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary">Close</Button>
                <Button variant="primary">Save changes</Button>
            </Modal.Footer>
            </Modal.Dialog>
        </div>
    )
}

export default ModalComp
