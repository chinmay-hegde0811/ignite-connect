import PageWrapper from '../../../../page-wrapper';
import Core from '../../..';

const Configuration = () => {
  return (
    <>
      <PageWrapper title={'My Account'}>
        <div className="configuration-wrapper">
          <div className="logo-column">
            <ul className='config-tabs'>
              <li className='active'>Configuration</li>
            </ul>
            <Core.CustomerLogo />
          </div>
          <div className="form-wrapper">
            <Core.PaymentConfiguration />
          </div>
        </div>
      </PageWrapper>
    </>
  );
};
Configuration.displayName = 'Configuration';

export default Configuration;
