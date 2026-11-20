import { SimpleForm } from '../forms';
export const metadata={title:'Book an Appointment'};
export default function Appointment(){return <main id="main"><section className="page-heading compact"><span className="eyebrow">MAKE TIME FOR SOMETHING PERSONAL</span><h1>Your place<br/><em>in the atelier.</em></h1><p>Tell us when you would like to talk, plan, or explore the perfect fit.</p></section><section className="form-section"><SimpleForm appointment/></section></main>}
