import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/react'
import {
  FileText,
  Image,
  PenLine,
  Hash,
  Trash2,
  Loader2,
  Eye,
  X,
  Sparkles,
  Download,
} from 'lucide-react'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const CreationItem = ({ item, onDeleted }) => {

  const { getToken } = useAuth()

  const [deleting, setDeleting] = useState(false)
  const [showModal, setShowModal] = useState(false)

  // =====================================================
  // TYPE INFORMATION
  // =====================================================

  const getTypeInfo = () => {

    switch (item?.type) {

      case 'image':
        return {
          label: 'AI IMAGE',
          icon: Image,
          iconColor: '#ec4899',
          iconBackground: '#fdf2f8',
        }

      case 'article':
        return {
          label: 'ARTICLE',
          icon: PenLine,
          iconColor: '#8b5cf6',
          iconBackground: '#f5f3ff',
        }

      case 'blog-title':
        return {
          label: 'BLOG TITLE',
          icon: Hash,
          iconColor: '#16a34a',
          iconBackground: '#f0fdf4',
        }

      case 'resume-review':
        return {
          label: 'RESUME REVIEW',
          icon: FileText,
          iconColor: '#0891b2',
          iconBackground: '#ecfeff',
        }

      default:
        return {
          label: 'AI CREATION',
          icon: Sparkles,
          iconColor: '#4f46e5',
          iconBackground: '#eef2ff',
        }
    }
  }

  const typeInfo = getTypeInfo()
  const TypeIcon = typeInfo.icon

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {

    if (!date) return ''

    try {

      return new Date(date).toLocaleDateString(
        'en-IN',
        {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }
      )

    } catch {

      return ''

    }
  }

  // =====================================================
  // GET TITLE
  // =====================================================

  const getTitle = () => {

    if (item?.type === 'resume-review') {
      return 'Review the uploaded resume'
    }

    if (item?.prompt) {
      return item.prompt
    }

    switch (item?.type) {

      case 'article':
        return 'Generated Article'

      case 'blog-title':
        return 'Generated Blog Titles'

      case 'image':
        return 'Generated Image'

      default:
        return 'AI Creation'
    }
  }

  // =====================================================
  // GET PREVIEW
  // =====================================================

  const getPreview = () => {

    if (!item?.content) {
      return 'No content available'
    }

    if (item.type === 'image') {
      return 'AI generated image'
    }

    if (item.type === 'resume-review') {
      return 'AI-powered resume analysis'
    }

    const text = item.content
      .replace(/[#*_>`]/g, '')
      .replace(/\n+/g, ' ')
      .trim()

    if (text.length > 150) {
      return `${text.substring(0, 150)}...`
    }

    return text
  }

  // =====================================================
  // CLEAN MARKDOWN
  // =====================================================

  const cleanText = (text) => {

    if (!text) return ''

    return text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/`(.*?)`/g, '$1')
      .replace(/^#+\s*/gm, '')
      .replace(/^[-*•]\s*/gm, '')
      .replace(/^\d+\.\s*/gm, '')
      .replace(/---+/g, '')
      .replace(/\r/g, '')
      .trim()
  }

  // =====================================================
  // EXTRACT RESUME SECTIONS
  // =====================================================

  const getResumeSection = (content, sectionNames) => {

    if (!content) return []

    const lines = content
      .replace(/\r/g, '')
      .split('\n')

    const sections = []

    let currentSection = ''
    let currentItems = []

    const saveSection = () => {

      if (currentSection) {

        sections.push({
          title: currentSection,
          items: [...currentItems],
        })

      }

      currentItems = []
    }

    lines.forEach((line) => {

      const trimmed = line.trim()

      if (!trimmed) return

      // Detect headings such as:
      // ### 1. Strengths
      // ## Key Strengths
      // 1. Strengths
      const headingMatch = trimmed.match(
        /^(?:#{1,6}\s*)?(?:\d+\.\s*)?(.+?)\s*:?\s*$/
      )

      if (
        headingMatch &&
        (
          trimmed.startsWith('#') ||
          /^\d+\.\s/.test(trimmed)
        )
      ) {

        saveSection()

        currentSection =
          headingMatch[1]
            .replace(/\*\*/g, '')
            .trim()

        return
      }

      // Bullet point
      const bulletMatch = trimmed.match(
        /^(?:[-*•]|\d+[\.\)])\s+(.*)$/
      )

      if (bulletMatch) {

        currentItems.push(
          cleanText(bulletMatch[1])
        )

        return
      }

      // Normal paragraph
      currentItems.push(
        cleanText(trimmed)
      )

    })

    saveSection()

    return sections
      .filter(
        (section) =>
          section.title &&
          section.items.length > 0
      )
      .map((section) => ({
        ...section,
        matchedName:
          sectionNames.find((name) =>
            section.title
              .toLowerCase()
              .includes(name)
          ) || null,
      }))
  }

  // =====================================================
  // CREATE SHORT RESUME REVIEW
  // =====================================================

  const getResumeSummary = () => {

    const content = item?.content || ''

    const sections = getResumeSection(
      content,
      [
        'strength',
        'weakness',
        'improvement',
        'recommendation',
        'action',
        'overall',
        'summary',
      ]
    )

    // -----------------------------------------------
    // FIND SECTIONS
    // -----------------------------------------------

    const overallSection = sections.find(
      (section) =>
        section.title
          .toLowerCase()
          .includes('overall') ||
        section.title
          .toLowerCase()
          .includes('summary')
    )

    const strengthsSection = sections.find(
      (section) =>
        section.title
          .toLowerCase()
          .includes('strength')
    )

    const weaknessesSection = sections.find(
      (section) =>
        section.title
          .toLowerCase()
          .includes('weakness')
    )

    const improvementsSection = sections.find(
      (section) =>
        section.title
          .toLowerCase()
          .includes('improvement') ||
        section.title
          .toLowerCase()
          .includes('recommendation') ||
        section.title
          .toLowerCase()
          .includes('action')
    )

    // -----------------------------------------------
    // FIND FIRST PARAGRAPH
    // -----------------------------------------------

    const cleanedContent = content
      .replace(/\r/g, '')
      .trim()

    const firstHeadingIndex =
      cleanedContent.search(
        /(?:^|\n)\s*#{1,6}\s*/
      )

    let firstParagraph = ''

    if (firstHeadingIndex > 0) {

      firstParagraph = cleanedContent
        .substring(0, firstHeadingIndex)
        .replace(/---+/g, '')
        .trim()

    }

    if (!firstParagraph) {

      firstParagraph =
        overallSection?.items
          ?.join(' ') ||
        'Your resume was analyzed by Nexora AI.'

    }

    firstParagraph = cleanText(
      firstParagraph
    )

    // -----------------------------------------------
    // STRENGTHS
    // -----------------------------------------------

    let strengths =
      strengthsSection?.items || []

    strengths = strengths
      .filter(Boolean)
      .slice(0, 3)

    // -----------------------------------------------
    // WEAKNESSES
    // -----------------------------------------------

    let weaknesses =
      weaknessesSection?.items || []

    weaknesses = weaknesses
      .filter(Boolean)
      .slice(0, 3)

    // -----------------------------------------------
    // IMPROVEMENTS
    // -----------------------------------------------

    let improvements =
      improvementsSection?.items || []

    improvements = improvements
      .filter(Boolean)
      .slice(0, 3)

    // -----------------------------------------------
    // IF OLD REVIEW DOESN'T HAVE IMPROVEMENTS
    // USE ACTIONABLE WEAKNESSES
    // -----------------------------------------------

    if (improvements.length === 0) {

      improvements = weaknesses.map(
        (weakness) => {

          const text = weakness
            .replace(
              /^critical date error in experience[:\-]?\s*/i,
              ''
            )
            .trim()

          if (
            /lack of quantifiable metrics/i.test(
              weakness
            )
          ) {
            return 'Add measurable results, percentages, user counts, or performance improvements to your experience and projects.'
          }

          if (
            /experience reads like coursework/i.test(
              weakness
            )
          ) {
            return 'Rewrite experience bullets to emphasize actual engineering work, responsibilities, and outcomes.'
          }

          if (
            /unfocused career profile/i.test(
              weakness
            )
          ) {
            return 'Tailor your resume to the specific role and place your most relevant technical skills first.'
          }

          if (
            /microsoft office/i.test(
              weakness
            )
          ) {
            return 'Remove less relevant tools and use the space for role-specific technical skills.'
          }

          return `Address this issue: ${text}`
        }
      )

      improvements = improvements
        .filter(Boolean)
        .slice(0, 3)
    }

    // -----------------------------------------------
    // FALLBACKS
    // -----------------------------------------------

    if (strengths.length === 0) {

      strengths = [
        'Your resume contains relevant technical projects.',
        'Your technical stack demonstrates practical development experience.',
        'Your resume provides evidence of hands-on work.',
      ]
    }

    if (weaknesses.length === 0) {

      weaknesses = [
        'Some resume sections could be more concise.',
        'Project and experience descriptions could use stronger measurable results.',
        'The resume can be tailored more closely to the target role.',
      ]
    }

    if (improvements.length === 0) {

      improvements = [
        'Add measurable outcomes to important project and experience bullets.',
        'Keep descriptions concise and focused on impact.',
        'Tailor your technical skills and projects to each target role.',
      ]
    }

    return {
      summary: firstParagraph,
      strengths,
      weaknesses,
      improvements,
    }
  }

  // =====================================================
  // VIEW
  // =====================================================

  const handleView = () => {

    if (!item?.content) {

      alert(
        'No content available for this creation.'
      )

      return
    }

    setShowModal(true)
  }

  // =====================================================
  // CLOSE
  // =====================================================

  const closeModal = () => {
    setShowModal(false)
  }

  // =====================================================
  // DOWNLOAD IMAGE
  // =====================================================

  const handleDownload = async () => {

    if (!item?.content) return

    try {

      const response = await fetch(
        item.content
      )

      const blob =
        await response.blob()

      const url =
        window.URL.createObjectURL(blob)

      const link =
        document.createElement('a')

      link.href = url
      link.download =
        'nexora-ai-image.png'

      document.body.appendChild(link)

      link.click()

      document.body.removeChild(link)

      window.URL.revokeObjectURL(url)

    } catch (error) {

      console.error(
        'Download error:',
        error
      )

      window.open(
        item.content,
        '_blank'
      )
    }
  }

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async () => {

    if (!item?.id) {

      alert(
        'Creation ID is missing.'
      )

      return
    }

    const confirmed =
      window.confirm(
        'Are you sure you want to delete this creation? This action cannot be undone.'
      )

    if (!confirmed) return

    try {

      setDeleting(true)

      const token =
        await getToken()

      if (!token) {

        throw new Error(
          'Authentication token not found. Please sign in again.'
        )
      }

      const { data } =
        await axios.delete(
          `/api/user/delete-creation/${item.id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        )

      if (!data.success) {

        throw new Error(
          data.message ||
            'Failed to delete creation.'
        )
      }

      setShowModal(false)

      if (onDeleted) {
        onDeleted(item.id)
      }

    } catch (error) {

      console.error(
        'Delete creation error:',
        error
      )

      alert(
        error.response?.data?.message ||
          error.message ||
          'Failed to delete creation.'
      )

    } finally {

      setDeleting(false)

    }
  }

  // =====================================================
  // RENDER IMAGE MODAL
  // =====================================================

  const renderImageContent = () => {

    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '18px',
        }}
      >

        <div
          style={{
            width: '100%',
            maxHeight: '65vh',
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: '#f8fafc',

            backgroundImage: `
              linear-gradient(45deg, #e2e8f0 25%, transparent 25%),
              linear-gradient(-45deg, #e2e8f0 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, #e2e8f0 75%),
              linear-gradient(-45deg, transparent 75%, #e2e8f0 75%)
            `,

            backgroundSize: '20px 20px',

            backgroundPosition:
              '0 0, 0 10px, 10px -10px, -10px 0px',

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >

          <img
            src={item.content}
            alt={
              item.prompt ||
              'Generated image'
            }
            style={{
              maxWidth: '100%',
              maxHeight: '65vh',
              objectFit: 'contain',
              display: 'block',
            }}
          />

        </div>

        <button
          type="button"
          onClick={handleDownload}
          style={{
            height: '40px',
            padding: '0 18px',
            border: 'none',
            borderRadius: '9px',
            backgroundColor: '#ec4899',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >

          <Download size={15} />

          Download Image

        </button>

      </div>
    )
  }

  // =====================================================
  // RESUME MODAL
  // =====================================================

  const renderResumeContent = () => {

    const review =
      getResumeSummary()

    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}
      >

        {/* =============================================
            OVERALL SUMMARY
        ============================================== */}

        <div
          style={{
            backgroundColor: '#ffffff',
            border:
              '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '18px',
          }}
        >

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '9px',
              marginBottom: '10px',
            }}
          >

            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: '#ecfeff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >

              <Sparkles
                size={16}
                color="#0891b2"
              />

            </div>

            <h3
              style={{
                margin: 0,
                fontSize: '14px',
                fontWeight: 700,
                color: '#0f172a',
              }}
            >
              Overall Summary
            </h3>

          </div>

          <p
            style={{
              margin: 0,
              fontSize: '12px',
              lineHeight: 1.7,
              color: '#475569',
            }}
          >
            {review.summary}
          </p>

        </div>


        {/* =============================================
            KEY STRENGTHS
        ============================================== */}

        <div
          style={{
            backgroundColor: '#ffffff',
            border:
              '1px solid #bbf7d0',
            borderRadius: '12px',
            padding: '18px',
          }}
        >

          <h3
            style={{
              margin:
                '0 0 12px',
              fontSize: '14px',
              fontWeight: 700,
              color: '#15803d',
            }}
          >
            Key Strengths
          </h3>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '9px',
            }}
          >

            {review.strengths.map(
              (strength, index) => (

                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '9px',
                  }}
                >

                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor:
                        '#22c55e',
                      marginTop: '7px',
                      flexShrink: 0,
                    }}
                  />

                  <p
                    style={{
                      margin: 0,
                      fontSize: '11px',
                      lineHeight: 1.6,
                      color: '#475569',
                    }}
                  >
                    {strength}
                  </p>

                </div>

              )
            )}

          </div>

        </div>


        {/* =============================================
            KEY WEAKNESSES
        ============================================== */}

        <div
          style={{
            backgroundColor: '#ffffff',
            border:
              '1px solid #fed7aa',
            borderRadius: '12px',
            padding: '18px',
          }}
        >

          <h3
            style={{
              margin:
                '0 0 12px',
              fontSize: '14px',
              fontWeight: 700,
              color: '#ea580c',
            }}
          >
            Key Weaknesses
          </h3>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '9px',
            }}
          >

            {review.weaknesses.map(
              (weakness, index) => (

                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '9px',
                  }}
                >

                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor:
                        '#f97316',
                      marginTop: '7px',
                      flexShrink: 0,
                    }}
                  />

                  <p
                    style={{
                      margin: 0,
                      fontSize: '11px',
                      lineHeight: 1.6,
                      color: '#475569',
                    }}
                  >
                    {weakness}
                  </p>

                </div>

              )
            )}

          </div>

        </div>


        {/* =============================================
            TOP IMPROVEMENTS
        ============================================== */}

        <div
          style={{
            backgroundColor: '#ffffff',
            border:
              '1px solid #ddd6fe',
            borderRadius: '12px',
            padding: '18px',
          }}
        >

          <h3
            style={{
              margin:
                '0 0 12px',
              fontSize: '14px',
              fontWeight: 700,
              color: '#7c3aed',
            }}
          >
            Top Improvements
          </h3>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '9px',
            }}
          >

            {review.improvements.map(
              (improvement, index) => (

                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                  }}
                >

                  <span
                    style={{
                      minWidth: '21px',
                      height: '21px',
                      borderRadius: '6px',
                      backgroundColor:
                        '#f3e8ff',
                      color: '#7c3aed',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      fontWeight: 700,
                    }}
                  >
                    {index + 1}
                  </span>

                  <p
                    style={{
                      margin: 0,
                      fontSize: '11px',
                      lineHeight: 1.6,
                      color: '#475569',
                    }}
                  >
                    {improvement}
                  </p>

                </div>

              )
            )}

          </div>

        </div>

      </div>
    )
  }

  // =====================================================
  // NORMAL TEXT CONTENT
  // =====================================================

  const renderTextContent = () => {

    return (
      <div
        style={{
          width: '100%',
          maxHeight: '65vh',
          overflowY: 'auto',
          padding: '22px',
          backgroundColor: '#f8fafc',
          borderRadius: '12px',
          boxSizing: 'border-box',
        }}
      >

        <div
          style={{
            whiteSpace: 'pre-wrap',
            fontSize: '13px',
            lineHeight: 1.8,
            color: '#334155',
            wordBreak: 'break-word',
          }}
        >
          {cleanText(item.content)}
        </div>

      </div>
    )
  }

  // =====================================================
  // MODAL CONTENT
  // =====================================================

  const renderModalContent = () => {

    if (item.type === 'image') {
      return renderImageContent()
    }

    if (item.type === 'resume-review') {
      return renderResumeContent()
    }

    return renderTextContent()
  }

  // =====================================================
  // MAIN RENDER
  // =====================================================

  return (
    <>

      {/* =================================================
          CREATION CARD
      ================================================== */}

      <div
        style={{
          width: '100%',
          backgroundColor: '#ffffff',
          border:
            '1px solid #e2e8f0',
          borderRadius: '14px',
          padding: '14px 20px',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          boxShadow:
            '0 1px 3px rgba(15,23,42,0.04)',
        }}
      >

        {/* ICON */}

        <div
          style={{
            width: '54px',
            height: '54px',
            borderRadius: '12px',
            backgroundColor:
              typeInfo.iconBackground,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >

          <TypeIcon
            size={23}
            color={typeInfo.iconColor}
          />

        </div>


        {/* CONTENT */}

        <div
          style={{
            flex: 1,
            minWidth: 0,
          }}
        >

          {/* TYPE + DATE */}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '6px',
            }}
          >

            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color:
                  typeInfo.iconColor,
              }}
            >
              {typeInfo.label}
            </span>

            <span
              style={{
                color: '#cbd5e1',
                fontSize: '11px',
              }}
            >
              •
            </span>

            <span
              style={{
                fontSize: '11px',
                color: '#94a3b8',
              }}
            >
              {formatDate(
                item.created_at
              )}
            </span>

          </div>


          {/* TITLE */}

          <h3
            style={{
              margin: 0,
              fontSize: '14px',
              fontWeight: 600,
              color: '#0f172a',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {getTitle()}
          </h3>


          {/* PREVIEW */}

          <p
            style={{
              margin: '5px 0 0',
              fontSize: '11px',
              lineHeight: 1.5,
              color: '#94a3b8',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {getPreview()}
          </p>

        </div>


        {/* ACTIONS */}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexShrink: 0,
          }}
        >

          {/* VIEW */}

          <button
            type="button"
            onClick={handleView}
            title="View creation"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              border:
                '1px solid #dbe4ef',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >

            <Eye
              size={17}
              color="#64748b"
            />

          </button>


          {/* DELETE */}

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            title="Delete creation"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              border:
                '1px solid #fecaca',
              backgroundColor:
                '#fff1f2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: deleting
                ? 'not-allowed'
                : 'pointer',
              opacity: deleting
                ? 0.6
                : 1,
            }}
          >

            {deleting ? (

              <Loader2
                size={17}
                color="#ef4444"
                className="animate-spin"
              />

            ) : (

              <Trash2
                size={17}
                color="#ef4444"
              />

            )}

          </button>

        </div>

      </div>


      {/* =================================================
          VIEW MODAL
      ================================================== */}

      {showModal && (

        <div
          onClick={closeModal}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor:
              'rgba(15, 23, 42, 0.60)',
            backdropFilter:
              'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            boxSizing: 'border-box',
          }}
        >

          {/* MODAL */}

          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            style={{
              width: '100%',
              maxWidth:
                item.type === 'image'
                  ? '850px'
                  : '800px',
              maxHeight: '90vh',
              backgroundColor: '#ffffff',
              borderRadius: '18px',
              boxShadow:
                '0 25px 60px rgba(0,0,0,0.25)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >

            {/* MODAL HEADER */}

            <div
              style={{
                padding: '18px 22px',
                borderBottom:
                  '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0,
              }}
            >

              <div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '4px',
                  }}
                >

                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color:
                        typeInfo.iconColor,
                    }}
                  >
                    {typeInfo.label}
                  </span>

                  <span
                    style={{
                      color: '#cbd5e1',
                    }}
                  >
                    •
                  </span>

                  <span
                    style={{
                      fontSize: '11px',
                      color: '#94a3b8',
                    }}
                  >
                    {formatDate(
                      item.created_at
                    )}
                  </span>

                </div>

                <h2
                  style={{
                    margin: 0,
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#0f172a',
                  }}
                >
                  {getTitle()}
                </h2>

              </div>


              {/* CLOSE */}

              <button
                type="button"
                onClick={closeModal}
                title="Close"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '9px',
                  border:
                    '1px solid #e2e8f0',
                  backgroundColor:
                    '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >

                <X
                  size={18}
                  color="#64748b"
                />

              </button>

            </div>


            {/* MODAL BODY */}

            <div
              style={{
                padding: '22px',
                overflowY: 'auto',
                flex: 1,
                backgroundColor: '#ffffff',
              }}
            >

              {renderModalContent()}

            </div>

          </div>

        </div>

      )}

    </>
  )
}

export default CreationItem