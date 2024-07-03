import React from "react";
import { Card, Statistic } from "antd";
import {
  FileDoneOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  FileExcelOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";

const TenderStatisticCard = ({ title, value, valueStyle, prefix }) => (
  <Card bordered={false}>
    <Statistic
      title={title}
      value={value}
      valueStyle={valueStyle}
      prefix={prefix}
    />
  </Card>
);

export default TenderStatisticCard;
