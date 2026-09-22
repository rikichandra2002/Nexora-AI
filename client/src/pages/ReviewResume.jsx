import React, { useRef, useState } from 'react'
import {
  FileText,
  Sparkles,
  Upload,
  Loader2,
  Download,
  CheckCircle2,
  X,
} from 'lucide-react'

const ReviewResume = () => {
  const fileInputRef = useRef(null)

  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState(null)

  // =====================================================
  // SELECT RESUME
  // =====================================================

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]

    if (!file) return

    const allowedTypes = [
      'application/pdf',
      'image/png',
      'image/jpeg',
      'image/jpg',
    ]

    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a PDF, PNG, JPG or JPEG file.')
      return
    }

    setSelectedFile(file)
    setAnalysis(null)
  }

  // =====================================================
  // OPEN FILE SELECTOR
  // =====================================================

  const handleChooseFile = () => {
    fileInputRef.current?.click()
  }

  // =====================================================
  // REMOVE FILE
  // =====================================================

  const handleRemoveFile = () => {
    setSelectedFile(null)
    setAnalysis(null)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // =====================================================
  // REVIEW RESUME
  // =====================================================

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!selectedFile) return

    setLoading(true)
    setAnalysis(null)

    // -----------------------------------------------------
    // TEMPORARY DEMO
    // Replace this section with your actual API call.
    // -----------------------------------------------------

    setTimeout(() => {
      setAnalysis({
        score: 82,
        summary:
          'Your resume has a strong technical foundation with good project experience. A few improvements to structure, impact statements and keyword optimization could make it stronger.',
        strengths: [
          'Strong technical skill set',
          'Relevant project experience',
          'Good use of modern technologies',
          'Clear educational background',
        ],
        improvements: [
          'Add measurable achievements',
          'Improve project descriptions',
          'Optimize keywords for ATS',
          'Keep formatting consistent',
        ],
      })

      setLoading(false)

      console.log({
        resume: selectedFile,
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
              Review Resume
            </h1>

            <p
              style={{
                margin: '6px 0 0',
                fontSize: '14px',
                color: '#94a3b8',
              }}
            >
              Get AI-powered feedback to improve your resume.
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
                color: '#0891b2',
                fontWeight: 500,
              }}
            >
              Review Resume
            </span>
          </div>
        </div>

        {/* =====================================================
            TWO CARDS
        ====================================================== */}

        <div
          className="review-resume-grid"
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

            {/* Teal top line */}

            <div
              style={{
                height: '4px',
                width: '100%',
                background:
                  'linear-gradient(90deg, #06b6d4, #3b82f6)',
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
                      'linear-gradient(135deg, #06b6d4, #3b82f6)',
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
                    Resume Review
                  </h2>

                  <p
                    style={{
                      margin: '4px 0 0',
                      fontSize: '12px',
                      color: '#94a3b8',
                    }}
                  >
                    Upload your resume for an AI-powered review
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
                    UPLOAD
                ================================================== */}

                <label
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#334155',
                  }}
                >
                  Upload Resume
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={handleFileChange}
                  style={{
                    display: 'none',
                  }}
                />

                {!selectedFile ? (

                  <button
                    type="button"
                    onClick={handleChooseFile}
                    style={{
                      width: '100%',
                      height: '125px',
                      border:
                        '1px dashed #a5f3fc',
                      borderRadius: '10px',
                      backgroundColor: '#f7feff',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxSizing: 'border-box',
                    }}
                  >

                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '11px',
                        backgroundColor: '#ecfeff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '9px',
                      }}
                    >
                      <Upload
                        size={20}
                        color="#0891b2"
                      />
                    </div>

                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#475569',
                      }}
                    >
                      Click to upload your resume
                    </span>

                    <span
                      style={{
                        marginTop: '4px',
                        fontSize: '10px',
                        color: '#94a3b8',
                      }}
                    >
                      PDF, PNG or JPG
                    </span>

                  </button>

                ) : (

                  /* =================================================
                      SELECTED FILE
                  ================================================== */

                  <div
                    style={{
                      width: '100%',
                      height: '125px',
                      border:
                        '1px solid #a5f3fc',
                      borderRadius: '10px',
                      backgroundColor: '#f7feff',
                      padding: '11px',
                      boxSizing: 'border-box',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >

                    <div
                      style={{
                        width: '62px',
                        height: '82px',
                        borderRadius: '8px',
                        backgroundColor: '#ecfeff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <FileText
                        size={29}
                        color="#0891b2"
                      />
                    </div>

                    <div
                      style={{
                        flex: 1,
                        minWidth: 0,
                      }}
                    >

                      <p
                        style={{
                          margin: 0,
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#334155',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {selectedFile.name}
                      </p>

                      <p
                        style={{
                          margin: '5px 0 0',
                          fontSize: '10px',
                          color: '#94a3b8',
                        }}
                      >
                        {(
                          selectedFile.size /
                          (1024 * 1024)
                        ).toFixed(2)}{' '}
                        MB
                      </p>

                      <button
                        type="button"
                        onClick={handleChooseFile}
                        style={{
                          marginTop: '10px',
                          padding: 0,
                          border: 'none',
                          background: 'transparent',
                          color: '#0891b2',
                          fontSize: '10px',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        Change resume
                      </button>

                    </div>

                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      title="Remove resume"
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '7px',
                        border:
                          '1px solid #e2e8f0',
                        backgroundColor: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        flexShrink: 0,
                      }}
                    >
                      <X
                        size={14}
                        color="#64748b"
                      />
                    </button>

                  </div>
                )}

                {/* Helper */}

                <p
                  style={{
                    margin: '7px 0 0',
                    fontSize: '10px',
                    color: '#94a3b8',
                  }}
                >
                  Supports PDF, PNG, JPG and JPEG formats.
                </p>

                {/* =================================================
                    REVIEW BUTTON
                ================================================== */}

                <button
                  type="submit"
                  disabled={!selectedFile || loading}
                  style={{
                    width: '100%',
                    height: '42px',
                    marginTop: '22px',
                    border: 'none',
                    borderRadius: '9px',
                    background:
                      'linear-gradient(90deg, #06b6d4, #0891b2)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor:
                      !selectedFile || loading
                        ? 'not-allowed'
                        : 'pointer',
                    opacity:
                      !selectedFile || loading
                        ? 0.55
                        : 1,
                    boxShadow:
                      '0 3px 8px rgba(8,145,178,0.18)',
                  }}
                >

                  {loading ? (
                    <>
                      <Loader2
                        size={15}
                        className="animate-spin"
                      />
                      Reviewing Resume...
                    </>
                  ) : (
                    <>
                      <FileText size={15} />
                      Review Resume
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

            {/* Teal top line */}

            <div
              style={{
                height: '4px',
                width: '100%',
                background:
                  'linear-gradient(90deg, #22c55e, #06b6d4)',
                flexShrink: 0,
              }}
            />

            {/* =================================================
                HEADER
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
                      backgroundColor: '#ecfeff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <FileText
                      size={21}
                      color="#0891b2"
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
                      Analysis Results
                    </h2>

                    <p
                      style={{
                        margin: '4px 0 0',
                        fontSize: '12px',
                        color: '#94a3b8',
                      }}
                    >
                      Your AI-powered resume analysis will
                      appear here
                    </p>
                  </div>

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

              {/* =================================================
                  LOADING
              ================================================== */}

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
                      backgroundColor: '#ecfeff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Sparkles
                      size={27}
                      color="#0891b2"
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
                    Analyzing your resume
                  </h3>

                  <p
                    style={{
                      margin: '6px 0 0',
                      fontSize: '11px',
                      color: '#94a3b8',
                    }}
                  >
                    Nexora AI is reviewing your resume...
                  </p>

                </div>
              )}

              {/* =================================================
                  ANALYSIS RESULT
              ================================================== */}

              {!loading && analysis && (
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                  }}
                >

                  {/* Score */}

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '14px',
                      borderRadius: '10px',
                      backgroundColor: '#f0fdfa',
                      border: '1px solid #ccfbf1',
                    }}
                  >

                    <div
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        background:
                          'linear-gradient(135deg, #06b6d4, #14b8a6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          color: '#ffffff',
                          fontSize: '19px',
                          fontWeight: 700,
                        }}
                      >
                        {analysis.score}
                      </span>
                    </div>

                    <div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#334155',
                        }}
                      >
                        Resume Score
                      </p>

                      <p
                        style={{
                          margin: '5px 0 0',
                          fontSize: '10px',
                          lineHeight: 1.5,
                          color: '#64748b',
                        }}
                      >
                        Overall resume quality based on AI
                        analysis.
                      </p>
                    </div>

                  </div>

                  {/* Summary */}

                  <div>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#0f172a',
                      }}
                    >
                      Overall Feedback
                    </h3>

                    <p
                      style={{
                        margin: '7px 0 0',
                        fontSize: '11px',
                        lineHeight: 1.65,
                        color: '#64748b',
                      }}
                    >
                      {analysis.summary}
                    </p>
                  </div>

                  {/* Strengths */}

                  <div>

                    <h3
                      style={{
                        margin: 0,
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#0f172a',
                      }}
                    >
                      Strengths
                    </h3>

                    <div
                      style={{
                        marginTop: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                      }}
                    >
                      {analysis.strengths.map(
                        (item, index) => (
                          <div
                            key={index}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '7px',
                              fontSize: '10px',
                              color: '#64748b',
                            }}
                          >
                            <CheckCircle2
                              size={14}
                              color="#06b6d4"
                            />
                            {item}
                          </div>
                        )
                      )}
                    </div>

                  </div>

                  {/* Improvements */}

                  <div>

                    <h3
                      style={{
                        margin: 0,
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#0f172a',
                      }}
                    >
                      Suggested Improvements
                    </h3>

                    <div
                      style={{
                        marginTop: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                      }}
                    >
                      {analysis.improvements.map(
                        (item, index) => (
                          <div
                            key={index}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '7px',
                              fontSize: '10px',
                              color: '#64748b',
                            }}
                          >
                            <span
                              style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                backgroundColor:
                                  '#0891b2',
                                flexShrink: 0,
                              }}
                            />
                            {item}
                          </div>
                        )
                      )}
                    </div>

                  </div>

                </div>
              )}

              {/* =================================================
                  EMPTY STATE
              ================================================== */}

              {!loading && !analysis && (
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
                      backgroundColor: '#f0fdfa',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <FileText
                      size={30}
                      color="#99f6e4"
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
                    No analysis available yet
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
                    Upload your resume and click
                    "Review Resume" to get started.
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
            .review-resume-grid {
              grid-template-columns: 1fr !important;
            }
          }

          @media (max-width: 600px) {
            .review-resume-grid {
              gap: 18px !important;
            }
          }
        `}
      </style>
    </div>
  )
}

export default ReviewResume