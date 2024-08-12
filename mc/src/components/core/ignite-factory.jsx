import EntryPoint from './ignite/pages/entry-point/entry-point';
import PaymentModalComponent from './ignite/components/payment-methods/payment-modal';
import PaymentCard from './ignite/components/payment-methods/payment-card';
import OrderList from './ignite/pages/order-list';
import CancelAlert from './ignite/components/order-list/cancel-alert';
import OrderDetails from './ignite/pages/order-details';
import CaptureAmount from './ignite/components/order-details/capture-amount';
import RefundAmount from './ignite/components/order-details/refund-amount';
import CancelAmount from './ignite/components/order-details/cancel-amount';

import ConfigurationPage from './ignite/pages/configuration';
import Configuration from './ignite/pages/configuration/configuration';
import PaymentConfiguration from './ignite/components/configuration';
import Toggle from './ignite/components/configuration/fields/toggle';
import Text from './ignite/components/configuration/fields/text';
import Radio from './ignite/components/configuration/fields/radio';
import Select from './ignite/components/configuration/fields/select';
import MultiSelect from './ignite/components/configuration/fields/multi-select';
import Textarea from './ignite/components/configuration/fields/textarea';
import Component from './ignite/components/configuration/component';
import ConfigurationGroup from './ignite/components/configuration/configuration-group';
import CollapsibleGroup from './ignite/components/configuration/collapsible-group';
import Account from './ignite/components/configuration/account';

import PaymentConfigurationJSON from './ignite/config/PaymentConfiguration.json';
import DefaultJSON from './ignite/config/default.json';
import CustomerLogo from './ignite/components/configuration/customer-logo';
import StyledComponent from './ignite/components/styled-component';

export default class Ignite {
  get EntryPoint() {
    return EntryPoint;
  }
  get PaymentModalComponent() {
    return PaymentModalComponent;
  }
  get PaymentCard() {
    return PaymentCard;
  }
  get OrderList() {
    return OrderList;
  }
  get CancelAlert() {
    return CancelAlert;
  }
  get OrderDetails() {
    return OrderDetails;
  }
  get CaptureAmount() {
    return CaptureAmount;
  }
  get RefundAmount() {
    return RefundAmount;
  }
  get CancelAmount() {
    return CancelAmount;
  }
  get ConfigurationPage() {
    return ConfigurationPage;
  }
  get Configuration() {
    return Configuration;
  }
  get CustomerLogo() {
    return CustomerLogo
  }
  get PaymentConfiguration() {
    return PaymentConfiguration
  }
  get Component() {
    return Component
  }
  get ConfigurationGroup() {
    return ConfigurationGroup
  }
  get CollapsibleGroup() {
    return CollapsibleGroup
  }
  get Account() {
    return Account
  }
  get Toggle() {
    return Toggle
  }
  get Text() {
    return Text
  }
  get Radio() {
    return Radio
  }
  get Select() {
    return Select
  }
  get MultiSelect() {
    return MultiSelect
  }
  get Textarea() {
    return Textarea
  }
  get PaymentConfigurationJSON() {
    return PaymentConfigurationJSON
  }
  get DefaultJSON() {
    return DefaultJSON
  }
  get StyledComponent() {
    return StyledComponent
  }
}
