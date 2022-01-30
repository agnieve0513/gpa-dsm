<Row>
  <Col md={4}></Col>
  <Col md={8}>
    <button
      type="button"
      className="btn btn-outline-secondary"
      onClick={handleShow}
    >
      Filter <i className="fa fa-filter"></i>
    </button>{" "}
    */}
    <Offcanvas show={show} onHide={handleClose} placement={`end`}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Filter By</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form>
          <Form.Group controlId="role_id" className="mb-3">
            <Form.Select>
              <option>Open this select menu</option>
              <option value="1">Status</option>
              <option value="2">System Type</option>
              <option value="3">Time Frame</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>STATUS</Form.Label>
            <Form.Control
              type="text"
              placeholder="Please Select"
              required
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Save
          </Button>

          <Button variant="secondary" className="ms-2">
            Clear All
          </Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  </Col>
</Row>;
