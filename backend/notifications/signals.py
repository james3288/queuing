from django.db.models.signals import post_save
from django.dispatch import receiver
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from joborders.models import JobOrder

@receiver(post_save, sender=JobOrder)
def broadcast_new_joborder(sender, instance, created, **kwargs):
    if not created:
        return
    channel_layer = get_channel_layer()
    payload = {
        'type': 'notify',
        'payload': {
            'id': instance.id,
            'title': instance.title,
            'description': instance.description,
            'created_at': instance.created_at.isoformat(),
        }
    }
    async_to_sync(channel_layer.group_send)('notifications', payload)