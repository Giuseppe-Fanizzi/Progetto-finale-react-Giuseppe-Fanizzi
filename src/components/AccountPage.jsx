import { useState, useEffect, useContext } from 'react'
import  supabase  from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext";
import Avatar from '../components/Avatar';
import './css/profile.css';
import FavoritesContext from '../context/FavoritesContext';
import { FaTrashAlt } from 'react-icons/fa';

export default function AccountPage() {
  const { session } = useContext(SessionContext)

  
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [first_name, setFirstName] = useState(null)
  const [last_name, setLastName] = useState(null)
   const [avatar_url, setAvatarUrl] = useState(null)
  
  

  useEffect(() => {

    if (!session) return
    let ignore = false
    const getProfile = async () => {
      setLoading(true)
      const { user } = session

      const { data, error } = await supabase
        .from('profiles')
        .select('username, first_name, last_name, avatar_url')
        .eq('id', user.id)
        .single()

      if (!ignore) {
        if (error) {
          console.warn(error)
        } else if (data) {
          setUsername(data.username)
          setFirstName(data.first_name)
          setLastName(data.last_name)
           setAvatarUrl(data.avatar_url)
        }
      }

      setLoading(false)
    }

    getProfile()

    return () => {
      ignore = true
    }
  }, [session])

  if (!session) {
    return <div>Loading session…</div>
  }

  const updateProfile = async (event, avatarUrl) => {
    event.preventDefault()

    setLoading(true)
    const { user } = session

    const updates = {
      id: user.id,
      username,
      first_name,
      last_name,
      avatar_url: avatarUrl,
      updated_at: new Date(),
    }

    const { error } = await supabase.from('profiles').upsert(updates)

    if (error) {
      alert(error.message)
    } else {
      setAvatarUrl(avatarUrl)
    }
    setLoading(false)
  }

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="w-100" style={{ maxWidth: '480px' }}>
        <h2 className="mb-4 text-center">Profile Settings</h2>
        <form
          onSubmit={updateProfile}
          className="form-widget bg-white p-4 rounded shadow-sm"
        >
            <Avatar
            url={avatar_url}
            size={150}
            onUpload={(event, url) => updateProfile(event, url)} />
  
          <div className="mb-3 d-flex flex-column">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="text"
              value={session.user.email}
              disabled
              className="form-control"
            />
          </div>
          <div className="mb-3 d-flex flex-column">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              value={username || ''}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3 d-flex flex-column">
            <label htmlFor="first_name" className="form-label">
              First name
            </label>
            <input
              id="first_name"
              type="text"
              value={first_name || ''}
              onChange={(e) => setFirstName(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3 d-flex flex-column">
            <label htmlFor="last_name" className="form-label">
              Last name
            </label>
            <input
              id="last_name"
              type="text"
              value={last_name || ''}
              onChange={(e) => setLastName(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="d-grid">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-lg"
            >
              {loading ? 'Loading ...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

