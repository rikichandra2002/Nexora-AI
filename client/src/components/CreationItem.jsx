import React, { useState } from 'react'
import Markdown from 'react-markdown'
import { ArrowUpRight, ChevronDown } from 'lucide-react'

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false)

  // Get creation timestamp
  const rawDate =
    item?.createdAt ||
    item?.created_at ||
    item?.createdDate ||
    item?.date

  // Format date + exact time
  let createdDate = 'Date unavailable'

  if (rawDate) {
    const date = new Date(rawDate)

    if (!isNaN(date.getTime())) {
      createdDate = date.toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      })
    }
  }

  return (
    <div
      onClick={() => setExpanded(prev => !prev)}
      style={{
        width: '100%',
        background: '#ffffff',
        border: expanded
          ? '1px solid #f9a8d4'
          : '1px solid #e2e8f0',
        borderRadius: '16px',
        boxSizing: 'border-box',
        padding: '24px 30px',
        boxShadow: expanded
          ? '0 8px 25px rgba(236, 72, 153, 0.10)'
          : '0 2px 6px rgba(15, 23, 42, 0.04)',
        marginBottom: '22px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
    >

      {/* ================= TOP SECTION ================= */}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '30px',
        }}
      >

        {/* LEFT CONTENT */}

        <div
          style={{
            flex: 1,
            minWidth: 0,
            paddingRight: '20px',
          }}
        >

          <h3
            style={{
              margin: 0,
              fontSize: '15px',
              lineHeight: '24px',
              fontWeight: 500,
              color: '#1e293b',
            }}
          >
            {item?.prompt || 'Untitled creation'}
          </h3>


          {/* META INFORMATION */}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginTop: '9px',
              flexWrap: 'wrap',
            }}
          >

            <span
              style={{
                fontSize: '12px',
                fontWeight: 500,
                color: '#64748b',
                textTransform: 'capitalize',
              }}
            >
              {item?.type || 'creation'}
            </span>

            <span
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: '#cbd5e1',
              }}
            />

            <span
              style={{
                fontSize: '12px',
                color: '#94a3b8',
              }}
            >
              Created {createdDate}
            </span>

          </div>

        </div>


        {/* ================= RIGHT SIDE ================= */}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexShrink: 0,
          }}
        >

          {/* PINK TYPE BADGE */}

          <span
            style={{
              background: '#fdf2f8',
              border: '1px solid #f9a8d4',
              color: '#db2777',
              padding: '7px 14px',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: 500,
              textTransform: 'capitalize',
              whiteSpace: 'nowrap',
            }}
          >
            {item?.type || 'creation'}
          </span>


          {/* EXPAND BUTTON */}

          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: expanded ? '#fdf2f8' : '#f8fafc',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
          >

            {expanded ? (
              <ChevronDown
                style={{
                  width: '17px',
                  height: '17px',
                  color: '#db2777',
                }}
              />
            ) : (
              <ArrowUpRight
                style={{
                  width: '16px',
                  height: '16px',
                  color: '#64748b',
                }}
              />
            )}

          </div>

        </div>

      </div>


     {/* ================= EXPANDED RESULT ================= */}

{expanded && (
  <div
    onClick={(e) => e.stopPropagation()}
    style={{
      marginTop: '22px',
      paddingTop: '20px',
      borderTop: '1px solid #f1f5f9',
      width: '100%',
      minWidth: 0,
      boxSizing: 'border-box',
    }}
  >

    <p
      style={{
        margin: '0 0 12px',
        fontSize: '13px',
        fontWeight: 600,
        color: '#475569',
      }}
    >
      Generated Result
    </p>


    {/* ================= IMAGE RESULT ================= */}

    {item?.type === 'image' ? (

      <div
        style={{
          width: '100%',
          boxSizing: 'border-box',
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '16px',
          overflow: 'hidden',
        }}
      >

        <img
          src={item?.content}
          alt="Generated result"
          style={{
            display: 'block',
            width: '100%',
            maxWidth: '100%',
            maxHeight: '500px',
            objectFit: 'contain',
            borderRadius: '10px',
            margin: '0 auto',
          }}
        />

      </div>

    ) : (

      /* ================= TEXT / MARKDOWN RESULT ================= */

      <div
        style={{
          width: '100%',
          height: '420px',
          maxHeight: '420px',
          boxSizing: 'border-box',

          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',

          padding: '22px 24px',

          overflowY: 'auto',
          overflowX: 'hidden',

          color: '#334155',
          fontSize: '14px',
          lineHeight: '1.8',

          wordBreak: 'break-word',
          overflowWrap: 'anywhere',
        }}
      >

        <div
          className="reset-tw"
          style={{
            width: '100%',
            maxWidth: '100%',
            minWidth: 0,
            boxSizing: 'border-box',
            overflowWrap: 'anywhere',
            wordBreak: 'break-word',
          }}
        >

          <Markdown>
            {item?.content || 'No generated result available.'}
          </Markdown>

        </div>

      </div>

    )}

  </div>
)}
    </div>
  )
}

export default CreationItem