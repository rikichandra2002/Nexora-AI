import React, { useState } from 'react'
import {
  Edit3,
  Sparkles,
  Loader2,
  Copy,
  Download,
  FileText,
  Check,
} from 'lucide-react'

const WriteArticle = () => {
  const articleLengths = [
    {
      id: 'short',
      label: 'Short',
      description: '500–800 words',
      value: 800,
    },
    {
      id: 'medium',
      label: 'Medium',
      description: '800–1200 words',
      value: 1200,
    },
    {
      id: 'long',
      label: 'Long',
      description: '1200+ words',
      value: 1600,
    },
  ]

  const [topic, setTopic] = useState('')
  const [selectedLength, setSelectedLength] =
    useState('short')

  const [generatedArticle, setGeneratedArticle] =
    useState('')

  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  // =====================================================
  // GENERATE ARTICLE
  // =====================================================

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!topic.trim()) return

    setLoading(true)
    setGeneratedArticle('')

    // -----------------------------------------------------
    // TEMPORARY DEMO
    // Replace this section with your actual API call
    // -----------------------------------------------------

    setTimeout(() => {
      const selected = articleLengths.find(
        (item) => item.id === selectedLength
      )

      const demoArticle = `# ${topic}

Artificial intelligence is rapidly changing the way people interact with technology, businesses, and digital services. What was once considered a futuristic concept has now become an important part of everyday life.

## Understanding ${topic}

${topic} represents an important area of modern technology. It combines innovation, automation, and intelligent systems to solve problems more efficiently and create new opportunities.

As technology continues to evolve, understanding these developments has become increasingly important for students, developers, businesses, and everyday users.

## Why It Matters

One of the biggest advantages of ${topic} is its ability to improve productivity and simplify complex tasks. Modern AI-powered systems can analyze large amounts of information, identify patterns, and assist people in making better-informed decisions.

This has created opportunities across industries such as healthcare, education, finance, entertainment, and software development.

## The Future

The future of ${topic} is likely to be shaped by continuous innovation. As new tools and techniques are developed, the technology will become more accessible and useful.

However, responsible development will remain important. Privacy, security, transparency, and ethical considerations should be taken into account as these systems become more widely adopted.

## Conclusion

${topic} is becoming an increasingly important part of the modern digital landscape. By understanding its capabilities, opportunities, and limitations, individuals and organizations can make better use of the technology.

The coming years will likely bring even more developments, making this an exciting area to follow.`

      setGeneratedArticle(demoArticle)

      setLoading(false)

      console.log({
        topic,
        length: selected.value,
      })
    }, 1500)
  }

  // =====================================================
  // COPY ARTICLE
  // =====================================================

  const handleCopy = async () => {
    if (!generatedArticle) return

    try {
      await navigator.clipboard.writeText(
        generatedArticle
      )

      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (error) {
      console.error('Copy failed:', error)
    }
  }

  // =====================================================
  // DOWNLOAD ARTICLE
  // =====================================================

  const handleDownload = () => {
    if (!generatedArticle) return

    const blob = new Blob(
      [generatedArticle],
      {
        type: 'text/plain;charset=utf-8',
      }
    )

    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')

    link.href = url
    link.download = 'nexora-generated-article.txt'

    document.body.appendChild(link)

    link.click()

    document.body.removeChild(link)

    URL.revokeObjectURL(url)
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
              Write Article
            </h1>

            <p
              style={{
                margin: '6px 0 0',
                fontSize: '14px',
                color: '#94a3b8',
              }}
            >
              Generate high-quality articles with the
              power of AI.
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
                color: '#f97316',
                fontWeight: 500,
              }}
            >
              Write Article
            </span>
          </div>
        </div>

        {/* =====================================================
            TWO CARDS
        ====================================================== */}

        <div
          className="write-article-grid"
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
            {/* Orange top line */}

            <div
              style={{
                height: '4px',
                width: '100%',
                background:
                  'linear-gradient(90deg, #f97316, #facc15)',
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
                      'linear-gradient(135deg, #f97316, #facc15)',
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
                    Article Configuration
                  </h2>

                  <p
                    style={{
                      margin: '4px 0 0',
                      fontSize: '12px',
                      color: '#94a3b8',
                    }}
                  >
                    Tell AI what you want to write about
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
                    TOPIC
                ================================================== */}

                <div>
                  <label
                    htmlFor="article-topic"
                    style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#334155',
                    }}
                  >
                    Article Topic
                  </label>

                  <input
                    id="article-topic"
                    type="text"
                    value={topic}
                    onChange={(e) =>
                      setTopic(e.target.value)
                    }
                    placeholder="The future of artificial intelligence..."
                    required
                    style={{
                      width: '100%',
                      height: '48px',
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

                  <p
                    style={{
                      margin: '6px 0 0',
                      fontSize: '10px',
                      color: '#94a3b8',
                    }}
                  >
                    Enter a clear topic to generate a
                    better article.
                  </p>
                </div>

                {/* =================================================
                    ARTICLE LENGTH
                ================================================== */}

                <div
                  style={{
                    marginTop: '20px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '9px',
                    }}
                  >
                    <label
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#334155',
                      }}
                    >
                      Article Length
                    </label>

                    <span
                      style={{
                        fontSize: '10px',
                        color: '#94a3b8',
                      }}
                    >
                      Choose your preferred length
                    </span>
                  </div>

                  {/* Length Cards */}

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns:
                        'repeat(3, minmax(0, 1fr))',
                      gap: '9px',
                    }}
                  >
                    {articleLengths.map((item) => {
                      const selected =
                        selectedLength === item.id

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() =>
                            setSelectedLength(item.id)
                          }
                          style={{
                            position: 'relative',
                            minHeight: '60px',
                            padding: '10px 11px',
                            borderRadius: '10px',
                            border: selected
                              ? '1px solid #fb923c'
                              : '1px solid #dbe3ec',
                            backgroundColor: selected
                              ? '#fff7ed'
                              : '#ffffff',
                            textAlign: 'left',
                            cursor: 'pointer',
                            boxSizing: 'border-box',
                          }}
                        >
                          <div
                            style={{
                              fontSize: '12px',
                              fontWeight: 600,
                              color: selected
                                ? '#ea580c'
                                : '#334155',
                            }}
                          >
                            {item.label}
                          </div>

                          <div
                            style={{
                              marginTop: '4px',
                              fontSize: '10px',
                              color: '#94a3b8',
                            }}
                          >
                            {item.description}
                          </div>

                          {selected && (
                            <div
                              style={{
                                position: 'absolute',
                                top: '7px',
                                right: '7px',
                                width: '17px',
                                height: '17px',
                                borderRadius: '50%',
                                backgroundColor:
                                  '#f97316',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <Check
                                size={11}
                                color="#ffffff"
                              />
                            </div>
                          )}
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
                      'linear-gradient(90deg, #f97316, #facc15)',
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
                      '0 3px 8px rgba(249,115,22,0.18)',
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
                      <Edit3 size={15} />
                      Generate Article
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
            {/* Orange top line */}

            <div
              style={{
                height: '4px',
                width: '100%',
                background:
                  'linear-gradient(90deg, #fb923c, #facc15)',
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
                  justifyContent: 'space-between',
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
                      backgroundColor: '#fff7ed',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <FileText
                      size={21}
                      color="#f97316"
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
                      Generated Article
                    </h2>

                    <p
                      style={{
                        margin: '4px 0 0',
                        fontSize: '12px',
                        color: '#94a3b8',
                      }}
                    >
                      Your AI-generated article will appear
                      here
                    </p>
                  </div>
                </div>

                {/* Actions */}

                {generatedArticle && (
                  <div
                    style={{
                      display: 'flex',
                      gap: '7px',
                    }}
                  >
                    <button
                      type="button"
                      onClick={handleCopy}
                      title="Copy article"
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        border:
                          '1px solid #e2e8f0',
                        backgroundColor: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent:
                          'center',
                        cursor: 'pointer',
                      }}
                    >
                      {copied ? (
                        <Check
                          size={14}
                          color="#16a34a"
                        />
                      ) : (
                        <Copy
                          size={14}
                          color="#64748b"
                        />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleDownload}
                      title="Download article"
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        border:
                          '1px solid #e2e8f0',
                        backgroundColor: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent:
                          'center',
                        cursor: 'pointer',
                      }}
                    >
                      <Download
                        size={14}
                        color="#64748b"
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* =================================================
                ARTICLE CONTENT
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
                      backgroundColor: '#fff7ed',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Sparkles
                      size={27}
                      color="#f97316"
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
                    Writing your article
                  </h3>

                  <p
                    style={{
                      margin: '6px 0 0',
                      fontSize: '11px',
                      color: '#94a3b8',
                    }}
                  >
                    Nexora AI is creating your article...
                  </p>
                </div>
              )}

              {/* =================================================
                  GENERATED ARTICLE
              ================================================== */}

              {!loading && generatedArticle && (
                <article
                  style={{
                    width: '100%',
                    padding: '4px 2px 10px',
                    boxSizing: 'border-box',
                  }}
                >
                  {generatedArticle
                    .split('\n')
                    .map((line, index) => {
                      if (!line.trim()) {
                        return (
                          <div
                            key={index}
                            style={{
                              height: '9px',
                            }}
                          />
                        )
                      }

                      if (line.startsWith('# ')) {
                        return (
                          <h2
                            key={index}
                            style={{
                              margin: 0,
                              fontSize: '20px',
                              lineHeight: 1.3,
                              fontWeight: 600,
                              color: '#0f172a',
                            }}
                          >
                            {line.replace('# ', '')}
                          </h2>
                        )
                      }

                      if (line.startsWith('## ')) {
                        return (
                          <h3
                            key={index}
                            style={{
                              margin: 0,
                              fontSize: '14px',
                              lineHeight: 1.4,
                              fontWeight: 600,
                              color: '#c2410c',
                            }}
                          >
                            {line.replace(
                              '## ',
                              ''
                            )}
                          </h3>
                        )
                      }

                      return (
                        <p
                          key={index}
                          style={{
                            margin: 0,
                            fontSize: '11px',
                            lineHeight: 1.7,
                            color: '#475569',
                          }}
                        >
                          {line}
                        </p>
                      )
                    })}
                </article>
              )}

              {/* =================================================
                  EMPTY STATE
              ================================================== */}

              {!loading && !generatedArticle && (
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
                      backgroundColor: '#fffaf5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Edit3
                      size={30}
                      color="#f4c7a1"
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
                    No article generated yet
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
                    Enter a topic, select your preferred
                    length, and click "Generate Article"
                    to get started.
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
            .write-article-grid {
              grid-template-columns: 1fr !important;
            }
          }

          @media (max-width: 600px) {
            .write-article-grid {
              gap: 18px !important;
            }
          }
        `}
      </style>
    </div>
  )
}

export default WriteArticle