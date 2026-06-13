import {useParams, useNavigate, useLocation} from 'react-router-dom';
import styles from './SpaceSettingsPage.module.css';
import type {Space} from '@customTypes/Space';
import SettingsIcon from '@assets/icons/settings.svg?react';
import BackIcon from "@assets/icons/back.svg?react";
import SpaceBadge from '@components/Spaces/SpaceBadge/SpaceBadge';
import SpaceSettingsGeneralSection from '@components/Spaces/SpaceSettingsGeneralSection/SpaceSettingsGeneralSection';
import SpaceSettingsDangerSection from '@components/Spaces/SpaceSettingsDangerSection/SpaceSettingsDangerSection';
import {useTranslation} from 'react-i18next';
import {getGradient} from '@utils/space';
import {useRead} from "@hooks/api/useRead.ts";
import {useAuth} from "@hooks/api/useAuth.ts";
import {useDelete} from "@hooks/api/useDelete.ts";
import {useCreate} from "@hooks/api/useCreate.ts";
import {useQueryClient} from "@tanstack/react-query";
import {useUpdate} from "@hooks/api/useUpdate.ts";
import {useSnackbar} from "@components/Snackbar/SnackbarContext.tsx";


const GRADIENT_MAP: Record<Space['gradient'], string> = {
    'purple-pink': 'var(--gradient-purple-pink)',
    'blue-cyan': 'var(--gradient-blue-cyan)',
    'green': 'var(--gradient-green)',
};

export default function SpaceSettingsPage() {
    const {spaceId} = useParams<{ spaceId: string }>();
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {state} = useLocation();
    const {data: apiSpace} = useRead<Space>("spaces", spaceId, {
        enabled: !!state.space
    })
    const {user} = useAuth();
    const space = state.space ?? apiSpace
    const isAdmin = user?.data?.roles[space.id] === "owner";
    const deleteMutation = useDelete("spaces");
    const queryClient = useQueryClient();
    const leaveSpaceMutation = useCreate(`spaces/${space.id}/leave`, {
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["spaces"]}).then()
        }
    })
    const updateSpaceMutation = useUpdate("spaces")
    const {showSnackbar} = useSnackbar();
    return (
        <main className={styles.page}>

            {/* ── Page header ── */}
            <div className={styles.pageHeader}>
                <button
                    className={styles.backBtn}
                    onClick={() => navigate(`/spaces/${spaceId}`)}

                >
                    <div className={styles.backIcon}>
                        <BackIcon/>
                    </div>


                </button>

                <div
                    className={styles.spaceIcon}
                    style={{backgroundImage: GRADIENT_MAP[getGradient(state.space.gradient, state.space.id)]}}

                    aria-hidden="true"
                >
                    <SettingsIcon/>

                </div>

                <div className={styles.titleGroup}>
                    <div className={styles.titleRow}>

                        <h1 className={`${styles.pageTitle} h3`}>
                            {t('space.space_settings', 'Space Settings')}
                        </h1>
                    </div>
                    <p className={`${styles.pageSubtitle} bodyText`}>{space.name}</p>
                </div>

                <SpaceBadge role={user?.data?.roles[space.id] ?? "viewer"}/>
            </div>

            {/* ── Scrollable content ── */}
            <div className={styles.content}>

                {/* General — visible to all, editable only by admin */}
                <SpaceSettingsGeneralSection
                    initialName={space.name}
                    initialDescription={space.description}
                    readOnly={!isAdmin}
                    onSave={(data) => {
                        updateSpaceMutation.mutate({
                            id: space.id,
                            // @ts-expect-error some weird shit idk about
                            name: data.name,
                            description: data.description
                        }, {
                            onSuccess: () => {
                                showSnackbar({
                                    type: "success",
                                    message: "Space updated successfully"
                                })
                                queryClient.invalidateQueries({queryKey: ["spaces"]}).then();
                            }
                        })
                    }}
                />

                <SpaceSettingsDangerSection
                    viewerRole={user?.data?.roles[space.id] ?? "viewer"}
                    onLeave={() => {

                        leaveSpaceMutation.mutate({})
                        navigate('/spaces');
                    }}
                    onDelete={() => {
                        deleteMutation.mutate(space.id)
                        navigate('/spaces');
                    }}
                />

            </div>
        </main>
    );
}
