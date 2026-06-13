import { useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@hooks/api/useAuth';
import { AxiosClientV1 } from '../../axiosClient';
import styles from './JoinPage.module.css';

export default function JoinPage() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuth();

  const {
    mutate: acceptInvite,
    isPending,
    isError,
    isSuccess,
    data: response,
  } = useMutation({
    mutationFn: () => AxiosClientV1.post(`/invites/${token}/accept`),
  });

  useEffect(() => {
    if (user.data && token && !isPending && !isSuccess && !isError) {
      acceptInvite();
    }
  }, [user.data, token]);

  useEffect(() => {
    if (isSuccess) {
      const spaceId = (response?.data as { data?: { id?: string } })?.data?.id;
      if (spaceId) {
        navigate(`/spaces/${spaceId}`, { replace: true });
      }
    }
  }, [isSuccess, response, navigate]);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (user.isLoading) {
    return null;
  }

  if (!user.data) {
    window.location.href = `/login?redirect=${encodeURIComponent(`/join/${token}`)}`;
    return null;
  }

  return (
    <div className={styles.screen}>
      <div className={styles.card}>
        {isPending && (
          <div className={styles.statusWrap}>
            <div className={styles.spinner} />
            <p className={styles.statusText}>
              {t('join.validating', 'Validating invite link...')}
            </p>
          </div>
        )}

        {isError && (
          <div className={styles.statusWrap}>
            <div className={styles.errorIcon}>!</div>
            <h2 className={styles.errorTitle}>
              {t('join.invalid_title', 'Invalid or Expired Link')}
            </h2>
            <p className={styles.errorText}>
              {t(
                'join.invalid_desc',
                'This invite link is invalid or has expired. Please ask the space owner for a new invite.',
              )}
            </p>
            <button
              type="button"
              className={styles.actionBtn}
              onClick={() => navigate('/')}
            >
              {t('join.go_home', 'Go Home')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
