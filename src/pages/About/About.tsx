import Title from "../../components/Title/Title";

function About() {
    return (
        <>
            <Title main="About this platform"
                sub="All about beauty"
            />
            <div className="container">
                <section id="about" className="about">
                    <div className="section-title text-center mt-5">
                    </div>
                    <div className="row  mb-5">
                        <div className="col-lg-4">
                            <img src="../images/Inga-11.jpg" className="img-fluid  mb-5" alt="sunscreen" />
                        </div>
                        <div className="col-lg-8 pt-4 pt-lg-0 content">
                            <p className="fst-italic text-lg-left fs-2" >
                                Welcome to the Beauty&health website!
                                Here you can buy handmade products for face and body care.  Cosmetics made by hand, filled with care and love, created from natural ingredients without the use of chemicals.  Choosing cosmetics on our website, you not only contribute to your beauty and health, but also help to take care of the nature of our beautiful planet!  You can try cosmetics from different manufacturers.  These creamers from different countries are full of enthusiasm and love for their work.  Each has its own unique style, design, author's recipes for the most effective and safe cosmetics.  We wish you happy shopping!

                                Be naturally beautiful...
                                Sincerely, Beauty&health</p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default About;