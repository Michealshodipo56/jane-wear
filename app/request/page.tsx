import { RequestForm } from '../forms';
export const metadata={title:'Request an Outfit'};
export default function Request(){return <main id="main"><section className="page-heading compact"><span className="eyebrow">THE BESPOKE EXPERIENCE</span><h1>Let’s make it<br/><em>yours.</em></h1><p>A few thoughtful details. The beginning of something personal.</p><p className="fine">Interactive preview · requests are not yet delivered to the atelier.</p></section><section className="form-section"><RequestForm/></section></main>}
