import { KeyRound, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import type { Passkey } from '@/types/auth';

const IS_BOOTSTRAP = (import.meta.env.VITE_THEME || 'tailwind') === 'bootstrap';

type Props = {
    passkey: Passkey;
    onDelete: (id: number, onError: () => void) => void;
};

export default function PasskeyItem({ passkey, onDelete }: Props) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        setIsDeleting(true);
        onDelete(passkey.id, () => setIsDeleting(false));
    };

    return (
        <div
            className={
                IS_BOOTSTRAP
                    ? 'd-flex align-items-center justify-content-between gap-3 border-bottom p-3'
                    : 'p-4 flex items-center justify-between border-b last:border-b-0'
            }
        >
            <div
                className={
                    IS_BOOTSTRAP
                        ? 'd-flex align-items-center gap-3 overflow-hidden'
                        : 'gap-4 flex items-center'
                }
            >
                <div
                    className={
                        IS_BOOTSTRAP
                            ? 'd-flex align-items-center justify-content-center rounded-3 bg-body-secondary flex-shrink-0'
                            : 'h-10 w-10 rounded-xl bg-muted flex shrink-0 items-center justify-center'
                    }
                    style={
                        IS_BOOTSTRAP
                            ? {
                                  width: '2.5rem',
                                  height: '2.5rem',
                              }
                            : undefined
                    }
                >
                    <KeyRound
                        className={
                            IS_BOOTSTRAP
                                ? 'text-secondary'
                                : 'h-5 w-5 text-muted-foreground'
                        }
                        size={IS_BOOTSTRAP ? 20 : undefined}
                    />
                </div>

                <div
                    className={
                        IS_BOOTSTRAP
                            ? 'd-flex flex-column gap-1 overflow-hidden'
                            : 'space-y-1'
                    }
                >
                    <div
                        className={
                            IS_BOOTSTRAP
                                ? 'd-flex align-items-center gap-2 flex-wrap'
                                : 'gap-2.5 flex items-center'
                        }
                    >
                        <p
                            className={
                                IS_BOOTSTRAP
                                    ? 'fw-semibold mb-0 text-truncate'
                                    : 'font-medium tracking-tight'
                            }
                        >
                            {passkey.name}
                        </p>

                        {passkey.authenticator && (
                            <span
                                className={
                                    IS_BOOTSTRAP
                                        ? 'badge rounded-pill bg-body-secondary text-secondary fw-medium border'
                                        : 'gap-1 rounded-md bg-muted px-2 py-0.5 font-medium tracking-wide text-muted-foreground ring-border inline-flex items-center text-[11px] uppercase ring-1 ring-inset'
                                }
                            >
                                {passkey.authenticator}
                            </span>
                        )}
                    </div>

                    <p
                        className={
                            IS_BOOTSTRAP
                                ? 'small text-secondary mb-0'
                                : 'text-sm text-muted-foreground'
                        }
                    >
                        Added {passkey.created_at_diff}
                        {passkey.last_used_at_diff && (
                            <>
                                <span
                                    className={
                                        IS_BOOTSTRAP
                                            ? 'mx-1 opacity-50'
                                            : 'mx-1 text-muted-foreground/50'
                                    }
                                >
                                    /
                                </span>
                                Last used {passkey.last_used_at_diff}
                            </>
                        )}
                    </p>
                </div>
            </div>

            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className={
                            IS_BOOTSTRAP
                                ? 'btn btn-sm btn-outline-danger d-inline-flex align-items-center justify-content-center flex-shrink-0'
                                : 'text-destructive hover:bg-destructive/10 hover:text-destructive'
                        }
                    >
                        <Trash2
                            className={IS_BOOTSTRAP ? '' : 'h-4 w-4'}
                            size={IS_BOOTSTRAP ? 16 : undefined}
                        />

                        <span className="sr-only">Remove</span>
                    </Button>
                </DialogTrigger>

                <DialogContent>
                    <DialogTitle>Remove passkey</DialogTitle>

                    <DialogDescription>
                        Are you sure you want to remove the "{passkey.name}"
                        passkey? You will no longer be able to use it to sign
                        in.
                    </DialogDescription>

                    <DialogFooter
                        className={
                            IS_BOOTSTRAP
                                ? 'd-flex flex-column flex-sm-row gap-2'
                                : 'gap-2'
                        }
                    >
                        <DialogClose asChild>
                            <Button variant="secondary">Cancel</Button>
                        </DialogClose>

                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Removing...' : 'Remove passkey'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
