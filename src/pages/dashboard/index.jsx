import React from 'react';
import { Col, Container, Row, setConfiguration } from 'react-grid-system';
import Contribution from '../../components/contribution'
import * as Skins from '../../skins';
import './index.less';

setConfiguration({ containerWidths: [1366] })
const { Box } = Skins.Default;

function Dashboard() {
  return (
    <Container className="dash-container">
      <Row className="header">
        <Col md={12}>
          <Box title="GITHUB DATA CENTER" tHeight="60px" />
        </Col>
      </Row>
      <Row className="container">
        <Col md={3} className="left">
          <Box
            title={<div style={{ textAlign: 'left', paddingLeft: 16 }}>个人信息</div>}
            bHeight="200px"
          >
            {/* <BasicInfo currentUser={currentUser} /> */}
          </Box>
          <Box title={<div style={{ textAlign: 'left', paddingLeft: 16 }}>语言统计</div>} bHeight="250px" style={{ marginTop: 16 }}>
            {/* <Language currentUser={currentUser} /> */}
          </Box>
        </Col>
        <Col md={6} className="center">
          <Box title="模拟迁徙" bHeight="350px">
            {/* <Chart option={{}} /> */}
          </Box>
          <Box title="github提交记录" bHeight="104px" style={{ marginTop: 16 }}>
            <Contribution />
          </Box>
        </Col>
        <Col md={3} className="right">
          <Box title={<div style={{ textAlign: 'left', paddingLeft: 16 }}>这是个标题right</div>} bHeight="200px">
          right1
          </Box>
          <Box title={<div style={{ textAlign: 'left', paddingLeft: 16 }}>这是个标题right</div>} bHeight="250px" style={{ marginTop: 16 }}>
          right2
          </Box>
        </Col>
      </Row>
      <Row className="footer" style={{ marginTop: 14 }}>
        <Col md={12} >
          <Box title="FOOTER" tHeight="60px" />
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
