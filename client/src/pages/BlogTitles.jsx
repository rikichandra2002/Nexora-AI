import React, { useState } from 'react'
import {
  Hash,
  Sparkles,
  Loader2,
  ArrowUpRight,
} from 'lucide-react'

const BlogTitles = () => {
  const categories = [
    'General',
    'Technology',
    'Business',
    'Health',
    'Lifestyle',
    'Education',
    'Travel',
    'Food',
  ]

  const [keyword, setKeyword] = useState('')
  const [selectedCategory, setSelectedCategory] =
    useState('General')

  const [generatedTitles, setGeneratedTitles] =
    useState([])

  const [loading, setLoading] = useState(false)

  // =====================================================
  // GENERATE TITLES
  // =====================================================

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!keyword.trim()) return

    setLoading(true)
    setGeneratedTitles([])

    // -----------------------------------------------------
    // TEMPORARY DEMO DATA
    // Replace this with your actual API call later
    // -----------------------------------------------------

    setTimeout(() => {
      const demoTitles = [
        `The Future of ${keyword}: What You Need to Know`,
        `${keyword}: Trends, Benefits and What Comes Next`,
        `A Complete Guide to ${keyword} for Beginners`,
        `How ${keyword} Is Changing the Modern World`,
        `The Ultimate Guide to Understanding ${keyword}`,
      ]

      setGeneratedTitles(demoTitles)
      setLoading(false)

      console.log({
        keyword,
        category: selectedCategory,
      })
    }, 1500)
  }

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100%',
        backgroundColor: '#f5f8fc',
        padding: '32px 40px 50px 60px',
        boxSizing: 'border-box',
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1050px',
          margin: '0 auto',
        }}
      >
        {/* =====================================================
            PAGE HEADER
        ====================================================== */}

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '26px',
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: '26px',
                lineHeight: 1.2,
                fontWeight: 600,
                color: '#0f172a',
              }}
            >
              Blog Titles
            </h1>

            <p
              style={{
                margin: '6px 0 0',
                fontSize: '14px',
                color: '#94a3b8',
              }}
            >
              Generate engaging and creative titles with AI.
            </p>
          </div>

          {/* Breadcrumb */}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              fontSize: '12px',
            }}
          >
            <span
              style={{
                color: '#94a3b8',
              }}
            >
              Dashboard
            </span>

            <span
              style={{
                color: '#cbd5e1',
                fontSize: '16px',
              }}
            >
              ›
            </span>

            <span
              style={{
                color: '#16a34a',
                fontWeight: 500,
              }}
            >
              Blog Titles
            </span>
          </div>
        </div>

        {/* =====================================================
            TWO CARDS
        ====================================================== */}

        <div
          className="blog-titles-grid"
          style={{
            display: 'grid',
            gridTemplateColumns:
              'minmax(0, 1fr) minmax(0, 1fr)',
            gap: '28px',
            width: '100%',
          }}
        >
          {/* ===================================================
              LEFT CARD
          ==================================================== */}

          <div
            style={{
              minHeight: '430px',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '14px',
              boxShadow:
                '0 2px 6px rgba(15, 23, 42, 0.06)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box',
            }}
          >
            {/* Green top line */}

            <div
              style={{
                height: '4px',
                width: '100%',
                background:
                  'linear-gradient(90deg, #16a34a, #4ade80)',
                flexShrink: 0,
              }}
            />

            <div
              style={{
                padding: '22px 24px 24px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
              }}
            >
              {/* =================================================
                  CARD HEADER
              ================================================== */}

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '22px',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background:
                      'linear-gradient(135deg, #16a34a, #4ade80)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Sparkles
                    size={21}
                    color="#ffffff"
                  />
                </div>

                <div>
                  <h2
                    style={{
                      margin: 0,
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#0f172a',
                    }}
                  >
                    AI Title Generator
                  </h2>

                  <p
                    style={{
                      margin: '4px 0 0',
                      fontSize: '12px',
                      color: '#94a3b8',
                    }}
                  >
                    Create catchy titles for your content
                  </p>
                </div>
              </div>

              {/* =================================================
                  FORM
              ================================================== */}

              <form
                onSubmit={onSubmitHandler}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                }}
              >
                {/* =================================================
                    KEYWORD
                ================================================== */}

                <div>
                  <label
                    htmlFor="blog-keyword"
                    style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#334155',
                    }}
                  >
                    Keyword
                  </label>

                  <input
                    id="blog-keyword"
                    type="text"
                    value={keyword}
                    onChange={(e) =>
                      setKeyword(e.target.value)
                    }
                    placeholder="The future of artificial intelligence"
                    required
                    style={{
                      width: '100%',
                      height: '44px',
                      padding: '0 13px',
                      boxSizing: 'border-box',
                      border: '1px solid #d8e0ea',
                      borderRadius: '9px',
                      outline: 'none',
                      backgroundColor: '#ffffff',
                      color: '#1e293b',
                      fontSize: '12px',
                      fontFamily: 'inherit',
                    }}
                  />
                </div>

                {/* =================================================
                    CATEGORY
                ================================================== */}

                <div
                  style={{
                    marginTop: '20px',
                  }}
                >
                  <label
                    style={{
                      display: 'block',
                      marginBottom: '9px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#334155',
                    }}
                  >
                    Category
                  </label>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns:
                        'repeat(3, minmax(0, 1fr))',
                      gap: '8px',
                    }}
                  >
                    {categories.map((category) => {
                      const selected =
                        selectedCategory === category

                      return (
                        <button
                          key={category}
                          type="button"
                          onClick={() =>
                            setSelectedCategory(category)
                          }
                          style={{
                            height: '34px',
                            padding: '0 8px',
                            borderRadius: '8px',
                            border: selected
                              ? '1px solid #86efac'
                              : '1px solid #e2e8f0',
                            backgroundColor: selected
                              ? '#ecfdf3'
                              : '#ffffff',
                            color: selected
                              ? '#15803d'
                              : '#64748b',
                            fontSize: '10px',
                            fontWeight: selected
                              ? 600
                              : 500,
                            cursor: 'pointer',
                            transition:
                              'all 0.2s ease',
                          }}
                        >
                          {category}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* =================================================
                    GENERATE BUTTON
                ================================================== */}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    height: '42px',
                    marginTop: '22px',
                    border: 'none',
                    borderRadius: '9px',
                    background:
                      'linear-gradient(90deg, #16a34a, #4ade80)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: loading
                      ? 'not-allowed'
                      : 'pointer',
                    opacity: loading ? 0.7 : 1,
                    boxShadow:
                      '0 3px 8px rgba(22,163,74,0.18)',
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={15}
                        className="animate-spin"
                      />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Hash size={15} />
                      Generate Titles
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* ===================================================
              RIGHT CARD
          ==================================================== */}

          <div
            style={{
              minHeight: '430px',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '14px',
              boxShadow:
                '0 2px 6px rgba(15, 23, 42, 0.06)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box',
            }}
          >
            {/* Green top line */}

            <div
              style={{
                height: '4px',
                width: '100%',
                background:
                  'linear-gradient(90deg, #22c55e, #86efac)',
                flexShrink: 0,
              }}
            />

            {/* =================================================
                RIGHT HEADER
            ================================================== */}

            <div
              style={{
                padding: '22px 24px 18px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: '#ecfdf3',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Hash
                    size={21}
                    color="#16a34a"
                  />
                </div>

                <div>
                  <h2
                    style={{
                      margin: 0,
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#0f172a',
                    }}
                  >
                    Generated Titles
                  </h2>

                  <p
                    style={{
                      margin: '4px 0 0',
                      fontSize: '12px',
                      color: '#94a3b8',
                    }}
                  >
                    Your AI-generated titles will appear here
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                RESULTS
            ================================================== */}

            <div
              style={{
                flex: 1,
                minHeight: 0,
                padding: '0 24px 24px',
                boxSizing: 'border-box',
                overflowY: 'auto',
              }}
            >
              {/* Loading */}

              {loading && (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      backgroundColor: '#ecfdf3',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Sparkles
                      size={27}
                      color="#16a34a"
                    />
                  </div>

                  <h3
                    style={{
                      margin: '15px 0 0',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#475569',
                    }}
                  >
                    Creating your titles
                  </h3>

                  <p
                    style={{
                      margin: '6px 0 0',
                      fontSize: '11px',
                      color: '#94a3b8',
                    }}
                  >
                    Nexora AI is generating creative
                    titles...
                  </p>
                </div>
              )}

              {/* =================================================
                  GENERATED TITLES
              ================================================== */}

              {!loading &&
                generatedTitles.length > 0 && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      paddingTop: '4px',
                    }}
                  >
                    {generatedTitles.map(
                      (title, index) => (
                        <div
                          key={index}
                          style={{
                            width: '100%',
                            minHeight: '54px',
                            padding: '10px 12px',
                            boxSizing: 'border-box',
                            border: '1px solid #e2e8f0',
                            borderRadius: '9px',
                            backgroundColor: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '10px',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '9px',
                              minWidth: 0,
                            }}
                          >
                            <div
                              style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '7px',
                                backgroundColor:
                                  '#ecfdf3',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent:
                                  'center',
                                flexShrink: 0,
                              }}
                            >
                              <Hash
                                size={13}
                                color="#16a34a"
                              />
                            </div>

                            <p
                              style={{
                                margin: 0,
                                fontSize: '11px',
                                lineHeight: 1.5,
                                color: '#334155',
                                fontWeight: 500,
                              }}
                            >
                              {title}
                            </p>
                          </div>

                          <button
                            type="button"
                            title="Open title"
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '7px',
                              border:
                                '1px solid #e2e8f0',
                              backgroundColor:
                                '#ffffff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent:
                                'center',
                              cursor: 'pointer',
                              flexShrink: 0,
                            }}
                          >
                            <ArrowUpRight
                              size={14}
                              color="#64748b"
                            />
                          </button>
                        </div>
                      )
                    )}
                  </div>
                )}

              {/* =================================================
                  EMPTY STATE
              ================================================== */}

              {!loading &&
                generatedTitles.length === 0 && (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: '62px',
                        height: '62px',
                        borderRadius: '50%',
                        backgroundColor: '#f5faf7',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Hash
                        size={30}
                        color="#b9d5c2"
                      />
                    </div>

                    <h3
                      style={{
                        margin: '16px 0 0',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#475569',
                      }}
                    >
                      No titles generated yet
                    </h3>

                    <p
                      style={{
                        margin: '7px 0 0',
                        maxWidth: '290px',
                        fontSize: '11px',
                        lineHeight: 1.6,
                        color: '#94a3b8',
                      }}
                    >
                      Enter a keyword and click
                      "Generate Titles" to get started.
                    </p>
                  </div>
                )}
            </div>
          </div>
        </div>

        {/* =====================================================
            FOOTER
        ====================================================== */}

        <div
          style={{
            textAlign: 'center',
            marginTop: '30px',
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: '11px',
              color: '#94a3b8',
            }}
          >
            © 2026 Nexora.ai. All rights reserved.
          </p>
        </div>
      </div>

      {/* =====================================================
          RESPONSIVE CSS
      ====================================================== */}

      <style>
        {`
          @media (max-width: 900px) {
            .blog-titles-grid {
              grid-template-columns: 1fr !important;
            }
          }

          @media (max-width: 600px) {
            .blog-titles-grid {
              gap: 18px !important;
            }
          }
        `}
      </style>
    </div>
  )
}

export default BlogTitles