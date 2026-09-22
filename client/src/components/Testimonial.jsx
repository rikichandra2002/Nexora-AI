const Testimonial = () => {

    const dummyTestimonialData = [
        {
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
            name: 'John Doe',
            title: 'Marketing Director, TechCorp',
            content: 'ContentAI has revolutionized our content workflow. The quality of the articles is outstanding, and it saves us hours of work every week.',
            rating: 4,
        },
        {
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
            name: 'Jane Smith',
            title: 'Content Creator, TechCorp',
            content: 'ContentAI has made our content creation process effortless. The AI tools have helped us produce high-quality content faster than ever before.',
            rating: 5,
        },
        {
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
            name: 'David Lee',
            title: 'Content Writer, TechCorp',
            content: 'ContentAI has transformed our content creation process. The AI tools have helped us produce high-quality content faster than ever before.',
            rating: 4,
        },
    ]

    return (
        <section
            style={{
                width: '100%',
                padding: '32px 20px 96px',
                overflow: 'hidden',
            }}
        >

            {/* Heading */}
            <div
                style={{
                    width: '100%',
                    maxWidth: '800px',
                    margin: '0 auto',
                    textAlign: 'center',
                }}
            >

                <h2 className="text-slate-700 text-4xl sm:text-[42px] font-semibold leading-tight">
                    Loved by Creators
                </h2>

                <p className="text-gray-500 mt-4 text-sm sm:text-base leading-6">
                    Don't just take our word for it. Here's what our users are saying.
                </p>

            </div>


            {/* Testimonials */}
            <div
                style={{
                    width: '100%',
                    maxWidth: '1152px',
                    margin: '48px auto 0',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                    gap: '24px',
                }}
                className="testimonial-grid"
            >

                {dummyTestimonialData.map((testimonial, index) => (

                    <div
                        key={index}
                        className="
                            min-h-[270px]
                            p-6
                            sm:p-7
                            rounded-2xl
                            bg-[#FDFDFE]
                            border
                            border-gray-100
                            shadow-sm
                            hover:shadow-lg
                            hover:-translate-y-1
                            transition-all
                            duration-300
                            flex
                            flex-col
                        "
                    >

                        {/* Stars */}
                        <div className="flex items-center gap-1">

                            {[...Array(5)].map((_, starIndex) => (

                                <svg
                                    key={starIndex}
                                    width="16"
                                    height="15"
                                    viewBox="0 0 16 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7.04894 0.92705C7.3483 0.00573921 8.6517 0.00573969 8.95106 0.92705L10.0206 4.21885C10.1545 4.63087 10.5385 4.90983 10.9717 4.90983H14.4329C15.4016 4.90983 15.8044 6.14945 15.0207 6.71885L12.2205 8.75329C11.87 9.00793 11.7234 9.4593 11.8572 9.87132L12.9268 13.1631C13.2261 14.0844 12.1717 14.8506 11.388 14.2812L8.58778 12.2467C8.2373 11.9921 7.7627 11.9921 7.41221 12.2467L4.61204 14.2812C3.82833 14.8506 2.77385 14.0844 3.0732 13.1631L4.14277 9.87132C4.27665 9.4593 4.12999 9.00793 3.7795 8.75329L0.979333 6.71885C0.195619 6.14945 0.598395 4.90983 1.56712 4.90983H5.02832C5.46154 4.90983 5.84583 4.63087 5.97937 4.21885L7.04894 0.92705Z"
                                        fill="#5044E5"
                                    />
                                </svg>

                            ))}

                        </div>


                        {/* Content */}
                        <p className="text-gray-500 text-sm leading-6 mt-5">
                            "{testimonial.content}"
                        </p>


                        {/* Divider */}
                        <hr className="border-gray-200 mt-auto mb-5" />


                        {/* User */}
                        <div className="flex items-center gap-4">

                            <img
                                src={testimonial.image}
                                className="w-12 h-12 object-cover rounded-full shrink-0"
                                alt={testimonial.name}
                            />

                            <div className="min-w-0">
                                <h3 className="font-medium text-slate-700 text-sm">
                                    {testimonial.name}
                                </h3>

                                <p className="text-xs text-gray-500 mt-1">
                                    {testimonial.title}
                                </p>
                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </section>
    )
}

export default Testimonial