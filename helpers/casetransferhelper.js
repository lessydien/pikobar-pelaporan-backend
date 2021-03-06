
const ObjectId = require("mongoose").Types.ObjectId

const setFalseAllThisCaseTransferLogs = (schema, caseId, unitId)  => {
  return schema.updateMany(
    { transfer_case_id: caseId, transfer_from_unit_id: unitId }, 
    { $set: { is_hospital_case_last_status: false } })
}

const buildTransferCasePaylod = (detailCase, latestTransferred, author, payload) => {
  if (latestTransferred) {
    return {
      transfer_from_unit_id: latestTransferred.transfer_from_unit_id,
      transfer_from_unit_name: latestTransferred.transfer_from_unit_name,
      transfer_comment: payload.transfer_comment || null,
      transfer_case_id: latestTransferred.transfer_case_id,
      transfer_last_history: detailCase.last_history,
      createdBy: author._id
    }
  } else {
    return {
      transfer_from_unit_id: author.unit_id._id,
      transfer_from_unit_name: author.unit_id.name,
      transfer_comment: payload.transfer_comment || null,
      transfer_case_id: detailCase._id,
      transfer_last_history: detailCase.last_history,
      createdBy: author._id
    }
  }
}

const buildUpdateCasePayload = async (action, author, caseId, payload, schema, latestTransferred)  => {
  let casePayload = {
    transfer_status: 'pending',
    transfer_to_unit_id: payload.transfer_to_unit_id,
    transfer_to_unit_name: payload.transfer_to_unit_name
  }

  if (['approve', 'decline', 'abort'].includes(action)) {
    casePayload.transfer_to_unit_id = latestTransferred.transfer_to_unit_id
    casePayload.transfer_to_unit_name = latestTransferred.transfer_to_unit_name
  }

  if (action === 'approve') {
    casePayload.transfer_status = 'approved'
    casePayload.latest_faskes_unit = latestTransferred.transfer_to_unit_id
  } else if (action === 'decline') {
    casePayload.transfer_status = 'declined'
  } else if (action === 'abort') {
    casePayload.transfer_status = null
    casePayload.transfer_to_unit_id = null
    casePayload.transfer_to_unit_name = null
    const latestTransferredApproved = await schema.findOne({
      transfer_case_id: caseId,
      transfer_from_unit_id: { $ne: author.unit_id._id },
      transfer_status: 'approved'
    })

    if (latestTransferredApproved) {
      casePayload.transfer_status = latestTransferredApproved.transfer_status
      casePayload.transfer_to_unit_id = latestTransferredApproved.transfer_to_unit_id
      casePayload.transfer_to_unit_name = latestTransferredApproved.transfer_to_unit_name
    }
  }

  return casePayload
}

const isObjectIdValid = (uuid) => {
  return ObjectId.isValid(uuid)
}

const buildParams = (type, user, query)  => {
  let params = {
    is_hospital_case_last_status: true,
    transfer_status: { $ne: 'aborted' }
  }
  
  if (query.transfer_status) {
    params.transfer_status = query.transfer_status
  }

  if(query.createdAt){
    let due = new Date(new Date(query.createdAt))
    due = new Date(due.setDate(due.getDate() + 1)).toISOString()
    params.createdAt = {
      $gte: new Date(query.createdAt),
      $lt: new Date(due)
    }
  }

  if (type == 'in') {
    params.transfer_to_unit_id = user.unit_id._id
    if(query.transfer_from_unit_id){
      let isValid = isObjectIdValid(query.transfer_from_unit_id)
      params.transfer_from_unit_id = isValid
        ? new ObjectId(query.transfer_from_unit_id)
        : null
    }
  } else {
    params.transfer_from_unit_id = user.unit_id._id
    if(query.transfer_to_unit_id){
      let isValid = isObjectIdValid(query.transfer_to_unit_id)
      params.transfer_to_unit_id = isValid
        ? new ObjectId(query.transfer_to_unit_id)
        : null
    }
  }

  return params
}

const buildCaseParams = (query)  => {
  let caseParams = {}
  if(query.status){
    caseParams.status = query.status
  }
  if(query.final_result){
    caseParams.final_result = query.final_result
  }
  if(query.address_district_code){
    caseParams.address_district_code = query.address_district_code
  }
  if(query.address_subdistrict_code){
    caseParams.address_subdistrict_code = query.address_subdistrict_code
  }
  if(query.address_village_code){
    caseParams.address_village_code = query.address_village_code
  }
  return caseParams
}

const buildSearchParams = (query)  => {
  let search = {}
  if (query.search) {
    search.$or = [
      { id_case : new RegExp(query.search || '',"i") },
      { name: new RegExp(query.search || '', "i") },
      { nik: new RegExp(query.search || '', "i") },
    ]
  }
  return search
}

module.exports = {
  setFalseAllThisCaseTransferLogs,
  buildTransferCasePaylod,
  buildUpdateCasePayload,
  buildParams,
  buildCaseParams,
  buildSearchParams,
}