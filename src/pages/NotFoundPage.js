import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import PopularPosts from "./PopularPosts";

const NotFoundPage = () => {
  return (
    <Container className="mt-3 pt-3">
      <Row style={{ minHeight: 500 }} className="p-4">
        <Col lg={8} className="mb-3" color="white">
          <Card className="p-3 text-center" style={{height: '200px'}}>
            <h1>Ошибка 404</h1>
            <p>Извините, такой страницы не существует либо она была удалена</p>
            <p>
              Хотите перейти на <Link to="/">главную страницу</Link>?
            </p>
          </Card>
        </Col>
        <PopularPosts />
      </Row>
    </Container>
  );
};

export default NotFoundPage;
