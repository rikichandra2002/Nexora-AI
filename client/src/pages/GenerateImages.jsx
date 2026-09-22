import React, { useState } from 'react'
import {
  Image as ImageIcon,
  Sparkles,
  Loader2,
  Download,
  Globe,
  Lock,
} from 'lucide-react'

const GenerateImages = () => {
  const imageStyles = [
    'Realistic',
    'Ghibli Style',
    'Anime Style',
    'Cartoon Style',
    'Fantasy Style',
    'Realistic Style',
    '3D Style',
    'Portrait Style',
  ]

  const [prompt, setPrompt] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('Realistic')
  const [generatedImage, setGeneratedImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isPublic, setIsPublic] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!prompt.trim()) return

    setLoading(true)
    setGeneratedImage(null)

    // Temporary demo
    setTimeout(() => {
      setGeneratedImage(
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80'
      )

      setLoading(false)

      console.log({
        prompt,
        style: selectedStyle,
        isPublic,
      })
    }, 1500)
  }

  const handleDownload = async () => {
    if (!generatedImage) return

    try {
      const response = await fetch(generatedImage)
      const blob = await response.blob()

      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = 'nexora-generated-image.jpg'

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
    }
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
              Generate Images
            </h1>

            <p
              style={{
                margin: '6px 0 0',
                fontSize: '14px',
                color: '#94a3b8',
              }}
            >
              Create stunning images with the power of AI.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              fontSize: '12px',
            }}
          >
            <span style={{ color: '#94a3b8' }}>
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
              Generate Images
            </span>
          </div>
        </div>

        {/* =====================================================
            TWO CARDS
        ====================================================== */}

        <div
  className="generate-images-grid"
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
              {/* Header */}

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
                    AI Image Generator
                  </h2>

                  <p
                    style={{
                      margin: '4px 0 0',
                      fontSize: '12px',
                      color: '#94a3b8',
                    }}
                  >
                    Describe what you want to see
                  </p>
                </div>
              </div>

              <form
                onSubmit={onSubmitHandler}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                }}
              >
                {/* =================================================
                    PROMPT
                ================================================== */}

                <div>
                  <label
                    htmlFor="image-prompt"
                    style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#334155',
                    }}
                  >
                    Describe Your Image
                  </label>

                  <textarea
                    id="image-prompt"
                    value={prompt}
                    onChange={(e) =>
                      setPrompt(e.target.value)
                    }
                    placeholder="Describe what you want to see in the image..."
                    required
                    style={{
                      width: '100%',
                      height: '82px',
                      padding: '11px 13px',
                      boxSizing: 'border-box',
                      resize: 'none',
                      border: '1px solid #d8e0ea',
                      borderRadius: '9px',
                      outline: 'none',
                      backgroundColor: '#ffffff',
                      color: '#1e293b',
                      fontSize: '12px',
                      lineHeight: 1.5,
                      fontFamily: 'inherit',
                    }}
                  />
                </div>

                {/* =================================================
                    STYLE
                ================================================== */}

                <div
                  style={{
                    marginTop: '18px',
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
                    Style
                  </label>

                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px',
                    }}
                  >
                    {imageStyles.map((style) => {
                      const selected =
                        selectedStyle === style

                      return (
                        <button
                          key={style}
                          type="button"
                          onClick={() =>
                            setSelectedStyle(style)
                          }
                          style={{
                            height: '30px',
                            padding: '0 13px',
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
                            whiteSpace: 'nowrap',
                            transition:
                              'all 0.2s ease',
                          }}
                        >
                          {style}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* =================================================
                    PUBLIC TOGGLE
                ================================================== */}

                <div
                  style={{
                    marginTop: '18px',
                    height: '46px',
                    padding: '0 12px',
                    borderRadius: '9px',
                    border: '1px solid #e2e8f0',
                    backgroundColor: '#fafbfc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxSizing: 'border-box',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <div
                      style={{
                        width: '27px',
                        height: '27px',
                        borderRadius: '7px',
                        backgroundColor: isPublic
                          ? '#ecfdf3'
                          : '#f1f5f9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {isPublic ? (
                        <Globe
                          size={14}
                          color="#16a34a"
                        />
                      ) : (
                        <Lock
                          size={14}
                          color="#64748b"
                        />
                      )}
                    </div>

                    <div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: '11px',
                          fontWeight: 600,
                          color: '#334155',
                        }}
                      >
                        Make this image public
                      </p>

                      <p
                        style={{
                          margin: '2px 0 0',
                          fontSize: '9px',
                          color: '#94a3b8',
                        }}
                      >
                        {isPublic
                          ? 'Others can view this image'
                          : 'Only you can view this image'}
                      </p>
                    </div>
                  </div>

                  {/* SMALL TOGGLE */}

                  <button
                    type="button"
                    role="switch"
                    aria-checked={isPublic}
                    aria-label="Make this image public"
                    onClick={() =>
                      setIsPublic(
                        (previous) => !previous
                      )
                    }
                    style={{
                      width: '32px',
                      height: '18px',
                      padding: '2px',
                      border: 'none',
                      borderRadius: '999px',
                      backgroundColor: isPublic
                        ? '#16a34a'
                        : '#cbd5e1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: isPublic
                        ? 'flex-end'
                        : 'flex-start',
                      cursor: 'pointer',
                      flexShrink: 0,
                      boxSizing: 'border-box',
                      transition:
                        'background-color 0.2s ease',
                    }}
                  >
                    <span
                      style={{
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        backgroundColor: '#ffffff',
                        boxShadow:
                          '0 1px 2px rgba(0,0,0,0.2)',
                      }}
                    />
                  </button>
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
                    marginTop: '16px',
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
                      <ImageIcon size={15} />
                      Generate Image
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

            {/* Header */}

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
                      backgroundColor: '#ecfdf3',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ImageIcon
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
                      Generated Image
                    </h2>

                    <p
                      style={{
                        margin: '4px 0 0',
                        fontSize: '12px',
                        color: '#94a3b8',
                      }}
                    >
                      Your AI-generated image will appear
                      here
                    </p>
                  </div>
                </div>

                {generatedImage && (
                  <button
                    type="button"
                    onClick={handleDownload}
                    title="Download image"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Download
                      size={14}
                      color="#64748b"
                    />
                  </button>
                )}
              </div>
            </div>

            {/* =================================================
                IMAGE AREA
            ================================================== */}

            <div
              style={{
                flex: 1,
                minHeight: 0,
                padding: '0 24px 24px',
                boxSizing: 'border-box',
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
                    Creating your image
                  </h3>

                  <p
                    style={{
                      margin: '6px 0 0',
                      fontSize: '11px',
                      color: '#94a3b8',
                    }}
                  >
                    Nexora AI is generating your image...
                  </p>
                </div>
              )}

              {/* Generated image */}

              {!loading && generatedImage && (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={generatedImage}
                    alt="Generated"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      borderRadius: '10px',
                    }}
                  />
                </div>
              )}

              {/* Empty state */}

              {!loading && !generatedImage && (
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
                    <ImageIcon
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
                    No image generated yet
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
                    Describe an image and click
                    "Generate Image" to get started.
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

      {/* Responsive */}

      <style>
        {`
          @media (max-width: 900px) {
            .generate-images-grid {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>
    </div>
  )
}

export default GenerateImages